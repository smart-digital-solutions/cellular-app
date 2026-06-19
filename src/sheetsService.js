// =============================================================
//  sheetsService.js — שירות גישה ל-Google Sheets
//  שימוש ב-gviz/tq endpoint (ציבורי, ללא API Key)
//  + Cache חכם ב-localStorage
// =============================================================

import { SHEET_ID, SHEET_NAMES, CATALOG_SHEET_ID, CATALOG_SHEET_NAME, GOOGLE_SHEETS_BASE_URL, CATALOG_CACHE_KEY, CATALOG_FALLBACK_FLAG_KEY, CACHE_DURATION_MINUTES, CACHE_PREFIX } from './config';
import {
  FALLBACK_TIERS, FALLBACK_ACCESSORIES, FALLBACK_MAINTENANCE,
  FALLBACK_FAQ, FALLBACK_SETTINGS, FALLBACK_CATALOG,
  FALLBACK_GUIDE, FALLBACK_IMPORTANT_NOTES, FALLBACK_TERMINATION_RULES
} from './fallbackData';

// CACHE_PREFIX is imported from config.js — do not redefine here

// ──────────────────────────────────────────────
//  Cache helpers
// ──────────────────────────────────────────────
function getCached(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    // SWR: return stale data immediately; background fetch will refresh.
    // After CACHE_DURATION_MINUTES the entry is considered stale — still
    // returned here so the UI renders instantly, but flagged so callers
    // can decide to re-fetch. For simplicity we always return and rely on
    // the useAppData mount-time fetch to keep data fresh.
    const ageMinutes = (Date.now() - timestamp) / 60_000;
    if (ageMinutes > CACHE_DURATION_MINUTES) {
      // Remove stale entry so next cold-start fetches from the network
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function setCache(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // localStorage מלא — לא קריטי
  }
}

export function clearCache() {
  Object.values(SHEET_NAMES).forEach(name => {
    localStorage.removeItem(CACHE_PREFIX + name);
  });
  // נקה גם קאש הקטלוג
  localStorage.removeItem(CACHE_PREFIX + CATALOG_CACHE_KEY);
  localStorage.removeItem(CACHE_PREFIX + CATALOG_FALLBACK_FLAG_KEY);
}

// ניקוי מפתחות ישנים עם prefix ישן (cellular_app_ ולא cellular_app_v2_)
// חשוב: מבטיח שנתונים ישנים לא יתקעו בדפדפן לנצח
const OLD_PREFIX = 'cellular_app_';
function clearLegacyCache() {
  const keysToDelete = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(OLD_PREFIX) && !key.startsWith(CACHE_PREFIX)) {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach(k => localStorage.removeItem(k));
}

export function getCachedAll() {
  // ניקוי מפתחות ישנים בכל טעינה
  try { clearLegacyCache(); } catch (error) { console.debug('Cache clear failed', error); }
  return {
    tiers: getCached(SHEET_NAMES.TIERS) || FALLBACK_TIERS,
    devices: getCached(SHEET_NAMES.ACCESSORIES) || FALLBACK_ACCESSORIES,
    maintenance: getCached(SHEET_NAMES.MAINTENANCE) || FALLBACK_MAINTENANCE,
    faq: getCached(SHEET_NAMES.FAQ) || FALLBACK_FAQ,
    settings: getCached(SHEET_NAMES.SETTINGS) || FALLBACK_SETTINGS,
    guide: getCached(SHEET_NAMES.GUIDE) || FALLBACK_GUIDE,
    importantNotes: getCached(SHEET_NAMES.IMPORTANT_NOTES) || FALLBACK_IMPORTANT_NOTES,
    terminationRules: getCached(SHEET_NAMES.TERMINATION_RULES) || FALLBACK_TERMINATION_RULES,
    catalog: getCached(CATALOG_CACHE_KEY) || FALLBACK_CATALOG,
    catalogIsFallback: getCached(CATALOG_FALLBACK_FLAG_KEY) ?? true,
    source: 'cache',
    errors: [],
  };
}


// ──────────────────────────────────────────────
//  Core fetch — Google gviz/tq JSON endpoint
//  לא דורש API Key! רק ה-Sheet חייב להיות ציבורי לצפייה
// ──────────────────────────────────────────────
async function fetchSheet(sheetName) {
  try {
    if (!SHEET_ID || SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
      throw new Error('SHEET_ID_NOT_CONFIGURED');
    }

    const url = `${GOOGLE_SHEETS_BASE_URL}/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&headers=1&_=${Date.now()}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const text = await response.text();
    const jsonStr = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/)?.[1];
    if (!jsonStr) throw new Error('Invalid response format');

    let json;
    try {
      json = JSON.parse(jsonStr);
    } catch {
      throw new Error('Failed to parse Sheets response as JSON');
    }
    if (json.status !== 'ok') throw new Error(json.errors?.[0]?.message || 'Sheets error');

    const { cols, rows } = json.table;
    const headers = cols.map(c => c.label || c.id);
    const colTypes = cols.map(c => c.type);

    const data = rows
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => {
          const cell = row.c[i];
          const colType = colTypes[i];
          const rawV = cell?.v;
          const rawF = cell?.f;

          let val = '';
          if (rawV !== null && rawV !== undefined) {
            val = rawV;
          } else if (colType === 'string' && rawF !== null && rawF !== undefined) {
            val = rawF;
          } else if (rawF !== null && rawF !== undefined && rawF !== '') {
            val = String(rawF);
          }
          
          // Use the label as key (not the single-letter column id like 'A','B')
          obj[h] = val;
        });
        return obj;
      })
      .filter(row => Object.values(row).some(v => v !== '' && v !== null && v !== undefined));

    console.log(`[Google Sheets] Succeeded fetching tab "${sheetName}":`, data.length, 'rows loaded.');
    setCache(sheetName, data);
    return data;
  } catch (err) {
    console.error(`[Google Sheets] Failed fetching tab "${sheetName}":`, err.message);
    throw err;
  }
}

// ──────────────────────────────────────────────
//  Catalog Fetch — גיליון ממשלתי חיצוני (קריאה בלבד)
// ──────────────────────────────────────────────
function getCatalogCategory(manufacturer, model) {
  const mfr = String(manufacturer).toUpperCase();
  const mod = String(model).toUpperCase();
  if (mfr.includes('APPLE')) return 'Apple iPhone';
  if (mod.includes('Z FOLD') || mod.includes('Z FLIP')) return 'Samsung Galaxy - מתקפלים (Z)';
  if (mod.includes('S25')) return 'Samsung Galaxy - סדרת S25';
  if (/\bA\d{2}/.test(mod)) return 'Samsung Galaxy - סדרת A';
  return 'Samsung Galaxy';
}

function parseCatalog(rows) {
  // החלק הראשון של הגיליון הממשלתי מכיל כותרות ושורת חודשים.
  // אנחנו מחפשים את השורה שמתחילה את הנתונים (אחרי שורת "יצרן").
  const headerRowIdx = rows.findIndex(row => {
    const v = String(row['B'] || row['יצרן'] || '').trim();
    return v === 'יצרן';
  });

  if (headerRowIdx === -1) return [];

  return rows.slice(headerRowIdx + 1)
    .filter(r => {
      const mfr = String(r['B'] || '').trim();
      const model = String(r['C'] || '').trim();
      return mfr.length > 0 && model.length > 0;
    })
    .map((r, idx) => {
      const manufacturer = String(r['B'] || '').trim();
      const model = String(r['C'] || '').trim();
      const storage = String(r['D'] || '').trim();
      const monthly = parseFloat(String(r['E'] || 0).replace(/,/g, '')) || 0;
      const buyout = parseFloat(String(r['F'] || 0).replace(/,/g, '')) || 0;
      const listPrice = parseFloat(String(r['G'] || 0).replace(/,/g, '')) || 0;
      const mTier = String(r['H'] || '').trim();
      
      // הוספת שם היצרן לתווית לחיפוש קל יותר
      const label = storage ? `${manufacturer} ${model} (${storage}GB)` : `${manufacturer} ${model}`;
      const id = `cat_${idx}_${manufacturer.replace(/[^a-zA-Z]/g, '').toLowerCase()}`;
      
      // מטריצת קנסות יציאה מוקדמת (חודשים 1 עד 24)
      // בגיליון הממשלתי: חודש 24 הוא עמודה L, חודש 1 הוא עמודה AI
      const monthlyMatrix = {};
      const colIds = ['AI','AH','AG','AF','AE','AD','AC','AB','AA','Z','Y','X','W','V','U','T','S','R','Q','P','O','N','M','L'];
      colIds.forEach((colId, i) => {
        const monthNum = i + 1;
        monthlyMatrix[monthNum] = parseFloat(String(r[colId] || 0).replace(/,/g, '')) || 0;
      });

      return {
        id, label, manufacturer, storage,
        category: getCatalogCategory(manufacturer, model),
        totalCost: monthly,
        buyoutPrice: buyout,
        listPrice,
        maintenanceTier: mTier,
        isFromCatalog: true,
        matrix: monthlyMatrix,
      };
    })
    .filter(r => r.totalCost > 0);
}

async function fetchCatalogFromSheet(sheetId, sheetName) {
  const url = `${GOOGLE_SHEETS_BASE_URL}/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&_=${Date.now()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const text = await response.text();
  const jsonStr = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/)?.[1];
  if (!jsonStr) throw new Error('Invalid catalog response');
  let json;
  try {
    json = JSON.parse(jsonStr);
  } catch {
    throw new Error('Failed to parse Catalog response as JSON');
  }
  if (json.status !== 'ok') throw new Error('Catalog error');
  const { cols, rows } = json.table;
  const colTypes = cols.map(c => c.type);
  const rawRows = rows.map(row => {
    const obj = {};
    cols.forEach((c, i) => {
      const h = c.label || c.id;
      const cell = row.c[i];
      const rawV = cell?.v;
      const rawF = cell?.f;
      let val = '';
      if (rawV !== null && rawV !== undefined) val = rawV;
      else if (colTypes[i] === 'string' && rawF != null) val = rawF;
      else if (rawF !== null && rawF !== undefined && rawF !== '') val = String(rawF);
      
      obj[h] = val;
      if (c.id) {
        obj[c.id] = val;
      }
    });
    return obj;
  });
  return parseCatalog(rawRows);
}

export async function fetchCatalog() {
  try {
    const parsed = await fetchCatalogFromSheet(CATALOG_SHEET_ID, CATALOG_SHEET_NAME);
    setCache(CATALOG_CACHE_KEY, parsed);
    setCache(CATALOG_FALLBACK_FLAG_KEY, false);
    return { data: parsed, isFallback: false };
  } catch (err) {
    console.warn('Official Catalog fetch failed, trying fallback:', err.message);
    try {
      const parsed = await fetchCatalogFromSheet(SHEET_ID, 'עלויות דגמי מכשירים ויתרה לסיום הליסינג');
      setCache(CATALOG_CACHE_KEY, parsed);
      setCache(CATALOG_FALLBACK_FLAG_KEY, true);
      return { data: parsed, isFallback: true };
    } catch (fallbackErr) {
      console.warn('Fallback Catalog fetch failed too:', fallbackErr.message);
      throw fallbackErr;
    }
  }
}

// ──────────────────────────────────────────────
//  Parsers — ממירים שורות גולמיות למבנה הנכון
// ──────────────────────────────────────────────
function parseTiers(rows) {
  return rows
    .filter(r => {
      const val = String(r.isActive ?? 'TRUE').toUpperCase();
      return val === 'TRUE' || val === '1';
    })
    .map(r => ({
      id: String(r.id || '').trim(),
      label: String(r.label || '').trim(),
      desc: String(r.desc || '').trim(),
      allowance: parseFloat(r.allowance) || 0,
      restrictToSimOnly: String(r.restrictToSimOnly || '').toUpperCase() === 'TRUE' || r.restrictToSimOnly === true,
    })).filter(r => r.id && r.label);
}

function parseDevices(rows) {
  return rows
    .filter(r => {
      const val = String(r.isActive ?? 'TRUE').toUpperCase();
      return val === 'TRUE' || val === '1';
    })
    .map(r => ({
      id: String(r.id || '').trim(),
      label: String(r.label || '').trim(),
      category: String(r.category || '').trim(),
      totalCost: parseFloat(r.totalCost) || 0,
    }))
    .filter(r => r.id && r.label);
}

function parseMaintenance(rows) {
  if (rows.length === 0) return [];

  // Always exclude system/internal columns
  const EXCLUDED_KEYS = new Set(['isActive', 'isactive']);

  const allKeys = Object.keys(rows[0]);
  const originalKeys = allKeys.filter(k => !EXCLUDED_KEYS.has(k) && !EXCLUDED_KEYS.has(k.toLowerCase()));

  // Detect if the first data row is actually a second row of sub-headers.
  // This happens when the user uses merged cells in Google Sheets.
  const firstRow = rows[0];
  const firstRowValues = originalKeys.map(k => String(firstRow[k] || ''));
  const isSubHeaderRow = firstRowValues.some(v =>
    v.includes('פעם') || v.includes('מעבר') || v.includes('מע"מ') ||
    v.includes('כולל') || v.includes('תקופת')
  );

  // Also detect if the keys themselves are single letters (A, B, C...) meaning gviz
  // returned column IDs instead of labels — the labels are in the first data row.
  const keysAreSingleLetters = originalKeys.every(k => /^[A-Z]{1,3}$/.test(k));

  let columnHeaders = originalKeys;
  let dataRows = rows;

  if (keysAreSingleLetters) {
    // First row IS the header labels, second row might be sub-headers
    const headerRow = rows[0];
    const subRow = rows[1];
    const hasSubHeaders = subRow && Object.values(subRow).some(v =>
      typeof v === 'string' && (v.includes('פעם') || v.includes('מעבר') || v.includes('כולל'))
    );

    if (hasSubHeaders) {
      columnHeaders = originalKeys.map(k => {
        const top = String(headerRow[k] || k);
        const sub = String(subRow[k] || '');
        return top + (sub ? '\n' + sub : '');
      });
      dataRows = rows.slice(2);
    } else {
      columnHeaders = originalKeys.map(k => String(headerRow[k] || k));
      dataRows = rows.slice(1);
    }
  } else if (isSubHeaderRow) {
    // Keys are real labels, but first row is sub-headers
    let lastValidKey = originalKeys[0];
    columnHeaders = originalKeys.map(k => {
      let topHeader = k;
      if (!k || k.match(/^[A-Z]{1,3}$/)) {
        topHeader = lastValidKey;
      } else {
        lastValidKey = k;
      }
      const subHeader = firstRow[k] || '';
      return topHeader + (subHeader ? '\n' + subHeader : '');
    });
    dataRows = rows.slice(1);
  }

  return dataRows
    .filter(r => {
      const val = String(r.isActive ?? r.isactive ?? 'TRUE').toUpperCase();
      return val === 'TRUE' || val === '1' || val === '';
    })
    .map(r => {
      const obj = {};
      originalKeys.forEach((oldKey, i) => {
        obj[columnHeaders[i]] = r[oldKey];
      });
      return obj;
    })
    .filter(r => {
      const keys = Object.keys(r);
      return keys.length > 0 && r[keys[0]]; // ensure tier/first column is not empty
    });
}

function parseFaq(rows) {
  return rows
    .filter(r => {
      const val = String(r.isActive ?? 'TRUE').toUpperCase();
      return val === 'TRUE' || val === '1';
    })
    .map(r => ({
      question: String(r.question || '').trim(),
      answer: String(r.answer || '').trim(),
      order: parseInt(r.order) || 999,
    }))
    .filter(r => r.question && r.answer)
    .sort((a, b) => a.order - b.order);
}

function parseGuide(rows) {
  return rows
    .filter(r => {
      const val = String(r.isActive ?? 'TRUE').toUpperCase();
      return val === 'TRUE' || val === '1';
    })
    .map(r => ({
      id: String(r.id || '').trim(),
      section: String(r.section || '').trim(),
      title: String(r.title || '').trim(),
      subtitle: String(r.subtitle || '').trim(),
      items: String(r.items || '').split('|').map(s => s.trim()).filter(Boolean),
      footer: String(r.footer || '').trim(),
      style: String(r.style || '').trim(),
      icon: String(r.icon || '').trim(),
      badge: String(r.badge || '').trim(),
      order: parseInt(r.order) || 999,
    }))
    .sort((a, b) => a.order - b.order);
}

function parseImportantNotes(rows) {
  return rows
    .filter(r => {
      const val = String(r.isActive ?? 'TRUE').toUpperCase();
      return val === 'TRUE' || val === '1';
    })
    .map(r => ({
      id: String(r.id || '').trim(),
      title: String(r.title || '').trim(),
      content: String(r.content || '').trim(),
      severity: String(r.severity || '').trim(),
      icon: String(r.icon || '').trim(),
      order: parseInt(r.order) || 999,
    }))
    .sort((a, b) => a.order - b.order);
}

function parseTerminationRules(rows) {
  return rows
    .filter(r => {
      const val = String(r.isActive ?? 'TRUE').toUpperCase();
      return val === 'TRUE' || val === '1';
    })
    .map(r => ({
      id: String(r.id || '').trim(),
      title: String(r.title || '').trim(),
      content: String(r.content || '').trim(),
      category: String(r.category || '').trim(),
      icon: String(r.icon || '').trim(),
      order: parseInt(r.order) || 999,
    }))
    .sort((a, b) => a.order - b.order);
}

function parseSettings(rows) {
  const settings = { ...FALLBACK_SETTINGS };
  rows.forEach(r => {
    // Fallback to column A and B if header row is missing/renamed
    const rawKey = r.key !== undefined ? r.key : r['A'];
    const rawVal = r.value !== undefined ? r.value : r['B'];
    
    const key = String(rawKey || '').trim();
    if (key) settings[key] = String(rawVal ?? '').trim();
  });
  return settings;
}

// ──────────────────────────────────────────────
//  Public API — מחזיר את כל הנתונים
//  עם Fallback אוטומטי לנתוני ברירת מחדל
// ──────────────────────────────────────────────
export async function loadAllData() {
  const isConfigured = SHEET_ID && SHEET_ID !== 'YOUR_GOOGLE_SHEET_ID_HERE';

  if (!isConfigured) {
    return {
      tiers: FALLBACK_TIERS, devices: FALLBACK_ACCESSORIES,
      maintenance: FALLBACK_MAINTENANCE, faq: FALLBACK_FAQ,
      settings: FALLBACK_SETTINGS, catalog: FALLBACK_CATALOG,
      guide: FALLBACK_GUIDE, importantNotes: FALLBACK_IMPORTANT_NOTES,
      terminationRules: FALLBACK_TERMINATION_RULES,
      source: 'fallback',
    };
  }

  const [results, catalogResult] = await Promise.all([
    Promise.allSettled([
      fetchSheet(SHEET_NAMES.TIERS),
      fetchSheet(SHEET_NAMES.ACCESSORIES),
      fetchSheet(SHEET_NAMES.MAINTENANCE),
      fetchSheet(SHEET_NAMES.FAQ),
      fetchSheet(SHEET_NAMES.SETTINGS),
      fetchSheet(SHEET_NAMES.GUIDE),
      fetchSheet(SHEET_NAMES.IMPORTANT_NOTES),
      fetchSheet(SHEET_NAMES.TERMINATION_RULES),
    ]),
    fetchCatalog().catch(e => { console.warn('Catalog fetch failed:', e.message); return null; }),
  ]);

  const getOrFallback = (result, parser, fallback) => {
    if (result.status === 'fulfilled') {
      const parsed = parser(result.value);
      return parsed.length > 0 ? parsed : fallback;
    }
    return fallback;
  };

  return {
    tiers: getOrFallback(results[0], parseTiers, FALLBACK_TIERS),
    devices: getOrFallback(results[1], parseDevices, FALLBACK_ACCESSORIES),
    maintenance: getOrFallback(results[2], parseMaintenance, FALLBACK_MAINTENANCE),
    faq: getOrFallback(results[3], parseFaq, FALLBACK_FAQ),
    settings: results[4].status === 'fulfilled' ? parseSettings(results[4].value) : FALLBACK_SETTINGS,
    guide: getOrFallback(results[5], parseGuide, FALLBACK_GUIDE),
    importantNotes: getOrFallback(results[6], parseImportantNotes, FALLBACK_IMPORTANT_NOTES),
    terminationRules: getOrFallback(results[7], parseTerminationRules, FALLBACK_TERMINATION_RULES),
    catalog: (catalogResult && catalogResult.data && catalogResult.data.length > 0) ? catalogResult.data : FALLBACK_CATALOG,
    catalogIsFallback: catalogResult ? catalogResult.isFallback : true,
    source: results.every(r => r.status === 'fulfilled') ? 'sheets' : 'partial',
    errors: results.filter(r => r.status === 'rejected').map(r => r.reason?.message),
  };
}
