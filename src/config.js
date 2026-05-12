// =============================================================
//  config.js — הגדרות מרכזיות לאפליקציית סלולאטור
// =============================================================

export const SHEET_ID = '1kL5cL3S_m79mNXg0k9wZxFURQuK4VuHiMtnX7qhM6YA';
export const CATALOG_SHEET_ID = '13HhcspJ_P0jnCmdz7icVeKQJCGWdur5vJ0wWfM5Wu_I';

export const GOOGLE_SHEETS_BASE_URL = 'https://docs.google.com/spreadsheets/d';
export const MAIN_SHEET_URL = `${GOOGLE_SHEETS_BASE_URL}/${SHEET_ID}/edit`;
export const CATALOG_SHEET_URL = `${GOOGLE_SHEETS_BASE_URL}/${CATALOG_SHEET_ID}/edit`;

export const SHEET_NAMES = {
  DEVICES: 'devices',
  TIERS: 'tiers',
  MAINTENANCE: 'maintenance',
  FAQ: 'faq',
  SETTINGS: 'settings',
};

// גיליון קטלוג המכשירים הממשלתי (מנהל הרכש)
export const CATALOG_SHEET_NAME = 'טבלאות מחירים בחתך דגם מכשיר וייתרת החודשים לסיום הליסינג';

// תקופת ליסינג בחודשים
export const LEASE_MONTHS = 24;

export const CACHE_DURATION_MINUTES = 30;
