// =============================================================
//  fallbackData.js — נתוני ברירת מחדל (Fallback)
//  אלו הנתונים שיוצגו אם Google Sheets לא זמין
//  או אם ה-Sheet עדיין לא הוגדר
// =============================================================

export const FALLBACK_TIERS = [
  { id: 'bachir_a', label: "מדרג בכיר א'", desc: "מנכ\"לים ומוקבלי מנכ\"לים ומעלה בדירוגים השונים.", allowance: 236.00, restrictToSimOnly: false },
  { id: 'bachir_b', label: "מדרג בכיר ב'", desc: "עובדים בסגל בכיר: מתח דרגות 42-44 ומעלה בדירוג המח\"ר או במתח מקביל.", allowance: 177.00, restrictToSimOnly: false },
  { id: 'tichon', label: "מדרג תיכון", desc: "עובדים במתחי דרגות שסיומם בדרגה 42 או 43 בדירוג המח\"ר, או במתח מקביל.", allowance: 118.00, restrictToSimOnly: false },
  { id: 'merav', label: "מדרג מירב", desc: "עובדים במתחי דרגות שסיומם בדרגה 40 או 41 בדירוג המח\"ר, או במתח מקביל.", allowance: 88.50, restrictToSimOnly: false },
  // v1.5: סטודנטים ואזרחים ותיקים הועברו ממדרג אחר למדרג מסד (זכאות 88.50 ₪)
  { id: 'masad', label: "מדרג מסד", desc: "עובדים במתחי דרגות שסיומם ב-39 ומטה. כולל סטודנטים ואזרחים ותיקים (עודכן ב-v1.5).", allowance: 88.50, restrictToSimOnly: false },
  // v1.5: מדרג אחר הוגדר מחדש כ'רשת ביטחון' גמישה — אינו שמור לאוכלוסייה ספציפית
  { id: 'other', label: "מדרג אחר (SIM ONLY)", desc: "קבוצת עובדים הזכאים רק לחבילת סלולר ללא מכשיר, בהתאם לשיקול דעת המשרד.", allowance: 11.06, restrictToSimOnly: true },
  { id: 'exception', label: "מדרג חריג (ללא השתתפות)", desc: "מכסה זמנית: חל\"ת, השעיה, שליחות. המכשיר ע\"ח פרטי.", allowance: 0, restrictToSimOnly: false },
];

export const FALLBACK_DEVICES = [
  { id: 'sim_only', label: 'מסלול ללא מכשיר (SIM Only)', category: 'מסלולים אישיים (BYOD)', totalCost: 11.06 },
  { id: 'sim_only_repair', label: 'מסלול SIM Only + שירות תיקונים', category: 'מסלולים אישיים (BYOD)', totalCost: 18.12 },
  { id: 'ip17_256', label: 'Apple iPhone 17 (256GB)', category: 'Apple iPhone - סדרת 17', totalCost: 73.56 },
  { id: 'ip17_air_256', label: 'Apple iPhone 17 Air (256GB)', category: 'Apple iPhone - סדרת 17', totalCost: 74.78 },
  { id: 'ip17_pro_256', label: 'Apple iPhone 17 Pro (256GB)', category: 'Apple iPhone - סדרת 17', totalCost: 90.49 },
  { id: 'ip17_pro_512', label: 'Apple iPhone 17 Pro (512GB)', category: 'Apple iPhone - סדרת 17', totalCost: 98.07 },
  { id: 'ip17_promax_256', label: 'Apple iPhone 17 Pro Max (256GB)', category: 'Apple iPhone - סדרת 17', totalCost: 93.06 },
  { id: 'ip17_promax_512', label: 'Apple iPhone 17 Pro Max (512GB)', category: 'Apple iPhone - סדרת 17', totalCost: 103.76 },
  { id: 'ip17_promax_1t', label: 'Apple iPhone 17 Pro Max (1TB)', category: 'Apple iPhone - סדרת 17', totalCost: 113.51 },
  { id: 's25_fe_256', label: 'Samsung Galaxy S25 FE (256GB)', category: 'Samsung Galaxy - סדרת S25', totalCost: 74.00 },
  { id: 's25_256', label: 'Samsung Galaxy S25 (256GB)', category: 'Samsung Galaxy - סדרת S25', totalCost: 82.34 },
  { id: 's25_plus_256', label: 'Samsung Galaxy S25 Plus (256GB)', category: 'Samsung Galaxy - סדרת S25', totalCost: 88.62 },
  { id: 's25_plus_512', label: 'Samsung Galaxy S25 Plus (512GB)', category: 'Samsung Galaxy - סדרת S25', totalCost: 95.60 },
  { id: 's25_ultra_256', label: 'Samsung Galaxy S25 Ultra (256GB)', category: 'Samsung Galaxy - סדרת S25', totalCost: 105.00 },
  { id: 's25_ultra_512', label: 'Samsung Galaxy S25 Ultra (512GB)', category: 'Samsung Galaxy - סדרת S25', totalCost: 112.93 },
  { id: 's25_ultra_1t', label: 'Samsung Galaxy S25 Ultra (1TB)', category: 'Samsung Galaxy - סדרת S25', totalCost: 130.52 },
  { id: 'zflip7_256', label: 'Samsung Galaxy Z Flip 7 (256GB)', category: 'Samsung Galaxy - מתקפלים (Z)', totalCost: 95.61 },
  { id: 'zflip7_512', label: 'Samsung Galaxy Z Flip 7 (512GB)', category: 'Samsung Galaxy - מתקפלים (Z)', totalCost: 107.10 },
  { id: 'zfold7_256', label: 'Samsung Galaxy Z Fold 7 (256GB)', category: 'Samsung Galaxy - מתקפלים (Z)', totalCost: 150.83 },
  { id: 'zfold7_512', label: 'Samsung Galaxy Z Fold 7 (512GB)', category: 'Samsung Galaxy - מתקפלים (Z)', totalCost: 157.42 },
  { id: 'a26_128', label: 'Samsung Galaxy A26 5G (128GB)', category: 'Samsung Galaxy - סדרת A', totalCost: 49.48 },
  { id: 'a36_128', label: 'Samsung Galaxy A36 5G (128GB)', category: 'Samsung Galaxy - סדרת A', totalCost: 52.24 },
  { id: 'a56_256', label: 'Samsung Galaxy A56 5G (256GB)', category: 'Samsung Galaxy - סדרת A', totalCost: 60.49 },
  { id: 'kosher_phone', label: 'מכשיר כשר מאושר ועדה (שיחות בלבד)', category: 'מכשירים כשרים (לחצנים)', totalCost: 26.20 },
  // v1.5: אביזרים — הוספת Galaxy Buds 4 Pro
  { id: 'galaxy_buds4_pro', label: 'Samsung Galaxy Buds 4 Pro (אוזניות)', category: 'אביזרים', totalCost: 26.00 },
];

export const FALLBACK_MAINTENANCE = [
  // v1.5: מכשיר לחצנים — בוטלה ההשתתפות הרגילה בהשבתה ואובדן. דורש סגירת התחייבות + רכישת ליסינג לחצנים חדש
  { tier: "מכשיר לחצנים (Feature Phone)", screen1: "50.40 ₪", screen2: "50.40 ₪", theft1: "סגירת התחייבות + ליסינג לחצנים חדש", disable1: "סגירת התחייבות + ליסינג לחצנים חדש" },
  { tier: "מכשיר עד 2,000 ₪", screen1: "110.10 ₪", screen2: "302.50 ₪", theft1: "504.00 ₪", disable1: "403.00 ₪" },
  { tier: "מכשיר עד 3,500 ₪", screen1: "110.10 ₪", screen2: "403.00 ₪", theft1: "1,664.00 ₪", disable1: "1,210.00 ₪" },
  { tier: "מכשיר עד 5,000 ₪", screen1: "110.10 ₪", screen2: "605.00 ₪", theft1: "2,269.00 ₪", disable1: "1,613.70 ₪" },
  { tier: "מכשיר מעל 5,000 ₪", screen1: "110.10 ₪", screen2: "807.00 ₪", theft1: "3,025.70 ₪", disable1: "50% מהמחיר" },
];

// v1.5: מדור שו"ת הוחלף ב"הודעות התכ"ם" — הפניות לאתר החשכ"ל (מקור אמת רגולטורי)
export const FALLBACK_FAQ = [
  {
    question: 'הוראת תכ"ם 16.7.1.1 — כללי מכרז הסלולר והזכאות',
    answer: 'הוראה זו מגדירה את תנאי ההתקשרות, מדרגי הזכאות ועקרונות חלוקת המנויים. לנוסח המחייב: https://mof.gov.il/agf/tachkemoney/pages/tachkemoney.aspx (הוראות תכ"ם 16.7.1.1)',
    order: 1
  },
  {
    question: 'הוראת תכ"ם 16.7.1.2 — תנאי שימוש ומדיניות מכשירים',
    answer: 'הוראה זו קובעת את תנאי הליסינג, BYOD, סוגי המכשירים המאושרים ותנאי הביטוח. לנוסח המחייב: אתר החשכ"ל — הוראות תכ"ם 16.7.1.2',
    order: 2
  },
  {
    question: 'הוראת תכ"ם 16.7.1.3 — שירותי חו"ל (Roaming) ו-Zero-Rating',
    answer: 'מגדירה את חבילות הגלישה בחו"ל, אפליקציות Zero-Rating (WhatsApp, Facebook, Waze, Google Maps ועוד) וחסימת גלישה אוטומטית (Hard Stop) בסיום הנפח. לנוסח המחייב: אתר החשכ"ל — הוראות תכ"ם 16.7.1.3',
    order: 3
  },
  {
    question: 'הוראת תכ"ם 16.7.1.4 — שירותי תחזוקה, ביטוח ותיקונים',
    answer: 'קובעת את מחירוני ההשתתפות העצמית, כללי BYOD (מהדגמים המאושרים במכרז בלבד), וההסדר לגבי מכשירי לחצנים. לנוסח המחייב: אתר החשכ"ל — הוראות תכ"ם 16.7.1.4',
    order: 4
  },
];

export const FALLBACK_SETTINGS = {
  app_title: 'סלולאטור',
  vat_rate: '18',
  lease_months: '24',
  contact_name: 'מנהל סלולר',
  contact_email: '',
  show_announcement: 'FALSE',
  announcement_text: '',
  announcement_type: 'info',
  footer_credit: 'דינה שרון | משרד התקשורת',
  partner_percent: '40',
  partner_name: 'פרטנר',
  palphone_percent: '60',
  palphone_name: 'פלאפון',
};

// נתוני גיבוי לקטלוג הממשלתי — מתעדכן אוטומטית מהגיליון הממשלתי בזמן אמת
export const FALLBACK_CATALOG = [
  // Apple iPhone 17e (חדש ב-v1.5)
  { id: 'cat_0_apple', label: 'Apple iPhone 17e (256GB)', category: 'Apple iPhone', manufacturer: 'APPLE', storage: '256', totalCost: 62.98, buyoutPrice: 1010.42, listPrice: 2659.00, maintenanceTier: 'עד 2,000 ₪', isFromCatalog: true },
  { id: 'cat_1_apple', label: 'Apple iPhone 17e (512GB)', category: 'Apple iPhone', manufacturer: 'APPLE', storage: '512', totalCost: 72.66, buyoutPrice: 1350.01, listPrice: 3552.67, maintenanceTier: 'עד 3,500 ₪', isFromCatalog: true },
  // Apple iPhone 17
  { id: 'cat_2_apple', label: 'Apple iPhone 17 (256GB)', category: 'Apple iPhone', manufacturer: 'APPLE', storage: '256', totalCost: 73.54, buyoutPrice: 1380.83, listPrice: 3633.75, maintenanceTier: 'עד 3,500 ₪', isFromCatalog: true },
  { id: 'cat_3_apple', label: 'Apple iPhone 17 Air (256GB)', category: 'Apple iPhone', manufacturer: 'APPLE', storage: '256', totalCost: 74.78, buyoutPrice: 1424.62, listPrice: 3749.00, maintenanceTier: 'עד 3,500 ₪', isFromCatalog: true },
  { id: 'cat_4_apple', label: 'Apple iPhone 17 Pro (256GB)', category: 'Apple iPhone', manufacturer: 'APPLE', storage: '256', totalCost: 90.49, buyoutPrice: 1899.00, listPrice: 4999.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  { id: 'cat_5_apple', label: 'Apple iPhone 17 Pro (512GB)', category: 'Apple iPhone', manufacturer: 'APPLE', storage: '512', totalCost: 98.07, buyoutPrice: 2100.00, listPrice: 5499.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  { id: 'cat_6_apple', label: 'Apple iPhone 17 Pro Max (256GB)', category: 'Apple iPhone', manufacturer: 'APPLE', storage: '256', totalCost: 93.06, buyoutPrice: 1990.00, listPrice: 5249.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  { id: 'cat_7_apple', label: 'Apple iPhone 17 Pro Max (512GB)', category: 'Apple iPhone', manufacturer: 'APPLE', storage: '512', totalCost: 103.76, buyoutPrice: 2290.00, listPrice: 5999.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  { id: 'cat_8_apple', label: 'Apple iPhone 17 Pro Max (1TB)', category: 'Apple iPhone', manufacturer: 'APPLE', storage: '1024', totalCost: 113.51, buyoutPrice: 2590.00, listPrice: 6799.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  // Samsung S25
  { id: 'cat_9_samsung', label: 'Samsung Galaxy S25 FE (256GB)', category: 'Samsung Galaxy - סדרת S25', manufacturer: 'SAMSUNG', storage: '256', totalCost: 74.00, buyoutPrice: 1350.00, listPrice: 3549.00, maintenanceTier: 'עד 3,500 ₪', isFromCatalog: true },
  { id: 'cat_10_samsung', label: 'Samsung Galaxy S25 (256GB)', category: 'Samsung Galaxy - סדרת S25', manufacturer: 'SAMSUNG', storage: '256', totalCost: 82.34, buyoutPrice: 1600.00, listPrice: 4149.00, maintenanceTier: 'עד 5,000 ₪', isFromCatalog: true },
  { id: 'cat_11_samsung', label: 'Samsung Galaxy S25 Plus (256GB)', category: 'Samsung Galaxy - סדרת S25', manufacturer: 'SAMSUNG', storage: '256', totalCost: 88.62, buyoutPrice: 1780.00, listPrice: 4649.00, maintenanceTier: 'עד 5,000 ₪', isFromCatalog: true },
  { id: 'cat_12_samsung', label: 'Samsung Galaxy S25 Plus (512GB)', category: 'Samsung Galaxy - סדרת S25', manufacturer: 'SAMSUNG', storage: '512', totalCost: 95.60, buyoutPrice: 1990.00, listPrice: 5199.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  { id: 'cat_13_samsung', label: 'Samsung Galaxy S25 Ultra (256GB)', category: 'Samsung Galaxy - סדרת S25', manufacturer: 'SAMSUNG', storage: '256', totalCost: 105.00, buyoutPrice: 2290.00, listPrice: 5999.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  { id: 'cat_14_samsung', label: 'Samsung Galaxy S25 Ultra (512GB)', category: 'Samsung Galaxy - סדרת S25', manufacturer: 'SAMSUNG', storage: '512', totalCost: 112.93, buyoutPrice: 2490.00, listPrice: 6499.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  { id: 'cat_15_samsung', label: 'Samsung Galaxy S25 Ultra (1TB)', category: 'Samsung Galaxy - סדרת S25', manufacturer: 'SAMSUNG', storage: '1024', totalCost: 130.52, buyoutPrice: 2990.00, listPrice: 7799.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  // Samsung Z
  { id: 'cat_16_samsung', label: 'Samsung Galaxy Z Flip 7 (256GB)', category: 'Samsung Galaxy - מתקפלים (Z)', manufacturer: 'SAMSUNG', storage: '256', totalCost: 95.61, buyoutPrice: 1990.00, listPrice: 5249.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  { id: 'cat_17_samsung', label: 'Samsung Galaxy Z Flip 7 (512GB)', category: 'Samsung Galaxy - מתקפלים (Z)', manufacturer: 'SAMSUNG', storage: '512', totalCost: 107.10, buyoutPrice: 2290.00, listPrice: 5999.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  { id: 'cat_18_samsung', label: 'Samsung Galaxy Z Fold 7 (256GB)', category: 'Samsung Galaxy - מתקפלים (Z)', manufacturer: 'SAMSUNG', storage: '256', totalCost: 150.83, buyoutPrice: 3490.00, listPrice: 9199.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  { id: 'cat_19_samsung', label: 'Samsung Galaxy Z Fold 7 (512GB)', category: 'Samsung Galaxy - מתקפלים (Z)', manufacturer: 'SAMSUNG', storage: '512', totalCost: 157.42, buyoutPrice: 3690.00, listPrice: 9699.00, maintenanceTier: 'מעל 5,000 ₪', isFromCatalog: true },
  // Samsung A
  { id: 'cat_20_samsung', label: 'Samsung Galaxy A26 5G (128GB)', category: 'Samsung Galaxy - סדרת A', manufacturer: 'SAMSUNG', storage: '128', totalCost: 48.94, buyoutPrice: 690.00, listPrice: 1749.00, maintenanceTier: 'עד 2,000 ₪', isFromCatalog: true },
  { id: 'cat_21_samsung', label: 'Samsung Galaxy A36 5G (128GB)', category: 'Samsung Galaxy - סדרת A', manufacturer: 'SAMSUNG', storage: '128', totalCost: 52.24, buyoutPrice: 790.00, listPrice: 2049.00, maintenanceTier: 'עד 2,000 ₪', isFromCatalog: true },
  { id: 'cat_22_samsung', label: 'Samsung Galaxy A56 5G (256GB)', category: 'Samsung Galaxy - סדרת A', manufacturer: 'SAMSUNG', storage: '256', totalCost: 60.49, buyoutPrice: 990.00, listPrice: 2549.00, maintenanceTier: 'עד 3,500 ₪', isFromCatalog: true },
];
