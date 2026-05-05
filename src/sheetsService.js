// =============================================================
//  sheetsService.js — שירות גישה ל-Google Sheets
//  שימוש ב-gviz/tq endpoint (ציבורי, ללא API Key)
//  + Cache חכם ב-localStorage
// =============================================================

import { SHEET_ID, SHEET_NAMES, CACHE_DURATION_MINUTES } from './config';
import {
  FALLBACK_TIERS, FALLBACK_DEVICES, FALLBACK_MAINTENANCE,
  FALLBACK_FAQ, FALLBACK_SETTINGS
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
    // הסרנו את בדיקת התוקף (ageMinutes) כדי שהמטמון ישמש רק כ-Stale data לטעינה ראשונית מהירה
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

// שולף את כל הנתונים השמורים במטמון כדי להתחיל את האפליקציה ב-0 שניות
export function getCachedAll() {
  return {
    tiers: getCached(SHEET_NAMES.TIERS) || FALLBACK_TIERS,
    devices: getCached(SHEET_NAMES.DEVICES) || FALLBACK_DEVICES,
    maintenance: getCached(SHEET_NAMES.MAINTENANCE) || FALLBACK_MAINTENANCE,
    faq: getCached(SHEET_NAMES.FAQ) || FALLBACK_FAQ,
    settings: getCached(SHEET_NAMES.SETTINGS) || FALLBACK_SETTINGS,
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

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&_=${Date.now()}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  // Google מחזיר JSONP-like — חייבים לנקות
  const text = await response.text();
  const jsonStr = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/)?.[1];
  if (!jsonStr) throw new Error('Invalid response format');

  const json = JSON.parse(jsonStr);
  if (json.status !== 'ok') throw new Error(json.errors?.[0]?.message || 'Sheets error');

  const { cols, rows } = json.table;
  const headers = cols.map(c => c.label || c.id);

  const data = rows
    .map(row => {
      const obj = {};
      headers.forEach((h, i) => {
        const cell = row.c[i];
        obj[h] = cell?.v ?? cell?.f ?? '';
      });
      return obj;
    })
    .filter(row => Object.values(row).some(v => v !== '' && v !== null && v !== undefined));

  setCache(sheetName, data);
  return data;
}

// ──────────────────────────────────────────────
//  Parsers — ממירים שורות גולמיות למבנה הנכון
// ──────────────────────────────────────────────
function parseTiers(rows) {
  return rows.map(r => ({
    id: String(r.id || '').trim(),
    label: String(r.label || '').trim(),
    desc: String(r.desc || '').trim(),
    allowance: parseFloat(r.allowance) || 0,
    restrictToSimOnly: String(r.restrictToSimOnly || '').toUpperCase() === 'TRUE',
  })).filter(r => r.id && r.label);
}

function parseDevices(rows) {
  return rows
    .filter(r => String(r.isActive || 'TRUE').toUpperCase() !== 'FALSE')
    .map(r => ({
      id: String(r.id || '').trim(),
      label: String(r.label || '').trim(),
      category: String(r.category || '').trim(),
      totalCost: parseFloat(r.totalCost) || 0,
    }))
    .filter(r => r.id && r.label);
}

function parseMaintenance(rows) {
  return rows.map(r => ({
    tier: String(r.tier || '').trim(),
    screen1: String(r.screen1 || '').trim(),
    screen2: String(r.screen2 || '').trim(),
    theft1: String(r.theft1 || '').trim(),
    disable1: String(r.disable1 || '').trim(),
  })).filter(r => r.tier);
}

function parseFaq(rows) {
  return rows
    .filter(r => String(r.isActive || 'TRUE').toUpperCase() !== 'FALSE')
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
      tiers: FALLBACK_TIERS,
      devices: FALLBACK_DEVICES,
      maintenance: FALLBACK_MAINTENANCE,
      faq: FALLBACK_FAQ,
      settings: FALLBACK_SETTINGS,
      source: 'fallback',
    };
  }

  const results = await Promise.allSettled([
    fetchSheet(SHEET_NAMES.TIERS),
    fetchSheet(SHEET_NAMES.DEVICES),
    fetchSheet(SHEET_NAMES.MAINTENANCE),
    fetchSheet(SHEET_NAMES.FAQ),
    fetchSheet(SHEET_NAMES.SETTINGS),
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
    settings: results[4].status === 'fulfilled'
      ? parseSettings(results[4].value)
      : FALLBACK_SETTINGS,
    source: results.every(r => r.status === 'fulfilled') ? 'sheets' : 'partial',
    errors: results.filter(r => r.status === 'rejected').map(r => r.reason?.message),
  };
}
