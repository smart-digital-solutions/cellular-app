// =============================================================
//  sheetsService.js — שירות גישה ל-Google Sheets
//  שימוש ב-gviz/tq endpoint (ציבורי, ללא API Key)
//  + Cache חכם ב-localStorage
// =============================================================

import { SHEET_ID, SHEET_NAMES, CATALOG_SHEET_ID, CATALOG_SHEET_NAME, GOOGLE_SHEETS_BASE_URL, CATALOG_CACHE_KEY, CATALOG_FALLBACK_FLAG_KEY, CACHE_DURATION_MINUTES } from './config';
import {
  FALLBACK_TIERS, FALLBACK_DEVICES, FALLBACK_MAINTENANCE,
  FALLBACK_FAQ, FALLBACK_SETTINGS, FALLBACK_CATALOG
} from './fallbackData';

const CACHE_PREFIX = 'cellular_app_';

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
}

export function getCachedAll() {
  return {
    tiers: getCached(SHEET_NAMES.TIERS) || FALLBACK_TIERS,
    devices: getCached(SHEET_NAMES.DEVICES) || FALLBACK_DEVICES,
    maintenance: getCached(SHEET_NAMES.MAINTENANCE) || FALLBACK_MAINTENANCE,
    faq: getCached(SHEET_NAMES.FAQ) || FALLBACK_FAQ,
    settings: getCached(SHEET_NAMES.SETTINGS) || FALLBACK_SETTINGS,
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
  if (!SHEET_ID || SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
    throw new Error('SHEET_ID_NOT_CONFIGURED');
  }

  // הסרנו את החסימה של המטמון. אנחנו תמיד רוצים למשוך נתונים טריים מגוגל (SWR)
  // const cached = getCached(sheetName);
  // if (cached) return cached;

  const url = `${GOOGLE_SHEETS_BASE_URL}/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&_=${Date.now()}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  // Google מחזיר JSONP-like — חייבים לנקות
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
  const colTypes = cols.map(c => c.type); // 'number' | 'string' | 'boolean'

  const data = rows
    .map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        const cell = row.c[i];
        const colType = colTypes[i];
        const rawV = cell?.v;
        const rawF = cell?.f;

        if (rawV !== null && rawV !== undefined) {
          // ערך מספרי/בוליאני תקין
          obj[h] = rawV;
        } else if (colType === 'string' && rawF !== null && rawF !== undefined) {
          // עמודת טקסט — f הוא הערך עצמו
          obj[h] = rawF;
        } else if (rawF !== null && rawF !== undefined && rawF !== '') {
          // עמודה מספרית עם תא טקסטואלי — gviz שם אותו ב-f
          obj[h] = String(rawF);
        } else {
          obj[h] = '';
        }
      });
      return obj;
    })
    .filter(row => Object.values(row).some(v => v !== '' && v !== null && v !== undefined));

  setCache(sheetName, data);
  return data;
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
      // בגיליון הממשלתי: חודש 24 הוא עמודה K, חודש 1 הוא עמודה AH
      const monthlyMatrix = {};
      const colIds = ['AH','AG','AF','AE','AD','AC','AB','AA','Z','Y','X','W','V','U','T','S','R','Q','P','O','N','M','L','K'];
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
      const parsed = await fetchCatalogFromSheet(SHEET_ID, 'Catalog');
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
  return rows
    .filter(r => {
      const val = String(r.isActive ?? 'TRUE').toUpperCase();
      return val === 'TRUE' || val === '1';
    })
    .map(r => ({
      tier: String(r.tier || '').trim(),
      screen1: String(r.screen1 || '').trim(),
      screen2: String(r.screen2 || '').trim(),
      theft1: String(r.theft1 || '').trim(),
      disable1: String(r.disable1 || '').trim(),
    })).filter(r => r.tier);
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

function parseSettings(rows) {
  const settings = { ...FALLBACK_SETTINGS };
  rows.forEach(r => {
    const key = String(r.key || '').trim();
    if (key) settings[key] = String(r.value ?? '').trim();
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
      tiers: FALLBACK_TIERS, devices: FALLBACK_DEVICES,
      maintenance: FALLBACK_MAINTENANCE, faq: FALLBACK_FAQ,
      settings: FALLBACK_SETTINGS, catalog: FALLBACK_CATALOG,
      source: 'fallback',
    };
  }

  const [results, catalogResult] = await Promise.all([
    Promise.allSettled([
      fetchSheet(SHEET_NAMES.TIERS),
      fetchSheet(SHEET_NAMES.DEVICES),
      fetchSheet(SHEET_NAMES.MAINTENANCE),
      fetchSheet(SHEET_NAMES.FAQ),
      fetchSheet(SHEET_NAMES.SETTINGS),
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
    devices: getOrFallback(results[1], parseDevices, FALLBACK_DEVICES),
    maintenance: getOrFallback(results[2], parseMaintenance, FALLBACK_MAINTENANCE),
    faq: getOrFallback(results[3], parseFaq, FALLBACK_FAQ),
    settings: results[4].status === 'fulfilled' ? parseSettings(results[4].value) : FALLBACK_SETTINGS,
    catalog: (catalogResult && catalogResult.data && catalogResult.data.length > 0) ? catalogResult.data : FALLBACK_CATALOG,
    catalogIsFallback: catalogResult ? catalogResult.isFallback : true,
    source: results.every(r => r.status === 'fulfilled') ? 'sheets' : 'partial',
    errors: results.filter(r => r.status === 'rejected').map(r => r.reason?.message),
  };
}
