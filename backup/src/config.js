// =============================================================
//  config.js — הגדרות מרכזיות לאפליקציית סלולאטור
//  כאן מגדירים את ה-Google Sheet המחובר לאפליקציה
// =============================================================

// 📌 שלב 1: צור Google Sheet חדש ועדכן את ה-ID כאן
//    הוראות: docs/GOOGLE_SHEETS_SETUP.md
export const SHEET_ID = '1kL5cL3S_m79mNXg0k9wZxFURQuK4VuHiMtnX7qhM6YA';

// שמות הגליונות בתוך ה-Sheet (חייבים להתאים בדיוק!)
export const SHEET_NAMES = {
  DEVICES: 'devices',
  TIERS: 'tiers',
  MAINTENANCE: 'maintenance',
  FAQ: 'faq',
  SETTINGS: 'settings',
};

// Cache: כמה זמן (בדקות) לשמור נתונים ב-localStorage לפני רענון
export const CACHE_DURATION_MINUTES = 30;
