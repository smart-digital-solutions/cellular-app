// =============================================================
//  config.js — הגדרות מרכזיות לאפליקציית סלולטור
// =============================================================

export const SHEET_ID = '1kL5cL3S_m79mNXg0k9wZxFURQuK4VuHiMtnX7qhM6YA';
export const CATALOG_SHEET_ID = '13HhcspJ_P0jnCmdz7icVeKQJCGWdur5vJ0wWfM5Wu_I';

export const GOOGLE_SHEETS_BASE_URL = 'https://docs.google.com/spreadsheets/d';
export const MAIN_SHEET_URL = `${GOOGLE_SHEETS_BASE_URL}/${SHEET_ID}/edit`;
export const CATALOG_SHEET_URL = `${GOOGLE_SHEETS_BASE_URL}/${CATALOG_SHEET_ID}/edit`;

export const SHEET_NAMES = {
  ACCESSORIES: 'accessories',
  TIERS: 'tiers',
  MAINTENANCE: 'maintenance',
  FAQ: 'faq',
  SETTINGS: 'settings',
  GUIDE: 'guide',
  IMPORTANT_NOTES: 'important_notes',
  TERMINATION_RULES: 'termination_rules',
};

// גיליון קטלוג המכשירים הממשלתי (מנהל הרכש)
export const CATALOG_SHEET_NAME = 'טבלאות מחירים בחתך דגם מכשיר וייתרת החודשים לסיום הליסינג';

// תקופת ליסינג בחודשים
export const LEASE_MONTHS = 24;

// מפתח לשמירת מטמון בדפדפן (localStorage)
// v3_ — מבטל כל קאש ישן (v2_, v1_, ללא גרסה) בטעינה הראשונה
export const CACHE_PREFIX = 'cellular_app_v3_';
export const CACHE_DURATION_MINUTES = 30;

// מפתח מטמון לקטלוג הממשלתי
export const CATALOG_CACHE_KEY = 'catalog';
export const CATALOG_FALLBACK_FLAG_KEY = 'catalogIsFallback';
