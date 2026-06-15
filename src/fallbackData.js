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

export const FALLBACK_ACCESSORIES = [
  { id: 'sim_only', label: 'מסלול ללא מכשיר (SIM Only)', category: 'מסלולים אישיים (BYOD)', totalCost: 11.06 },
  { id: 'sim_only_repair', label: 'מסלול SIM Only + שירות תיקונים', category: 'מסלולים אישיים (BYOD)', totalCost: 18.12 },
  { id: 'kosher_phone', label: 'מכשיר כשר מאושר ועדה (שיחות בלבד)', category: 'מכשירים כשרים (לחצנים)', totalCost: 26.20 },
  // v1.5: אביזרים — הוספת אוזניות מהמכרז
  { id: 'galaxy_buds_core', label: 'Samsung Buds core (אוזניות)', category: 'אביזרים', totalCost: 7.50 },
  { id: 'galaxy_buds3_fe', label: 'Samsung Buds 3 FE (אוזניות)', category: 'אביזרים', totalCost: 17.80 },
  { id: 'apple_airpods4', label: 'Apple Airpods דור 4 (אוזניות)', category: 'אביזרים', totalCost: 23.50 },
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
  app_title: 'סלולטור',
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
  default_theme: 'DARK'
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


export const FALLBACK_IMPORTANT_NOTES = [
  { id: 'credit_card_required', title: 'חובת הזנת כרטיס אשראי אישי', content: 'חובה להזין כרטיס אשראי אישי במערכת. ללא הסדרת אמצעי תשלום - העובד ייחסם לכל שדרוג עתידי. החיוב באשראי יבוצע בגין עלות ההשתתפות האישית, חריגות, וכל שירות נוסף שאינו מכוסה על ידי המשרד.', severity: 'warning', icon: 'credit-card', order: 1, isActive: true },
  { id: 'tax_benefit', title: 'זקיפת הטבה (שווי שימוש) בתלוש השכר', content: 'תבוצע זקיפת הטבה בתלוש השכר עבור תוכנית הסלולר, כולל מע"מ, ועבור ציוד קצה נוסף. המשמעות: הסכום ייחשב כהכנסה חייבת במס. מומלץ להתייעץ עם רכזי השכר של המשרד לגבי ההשפעה על תלוש השכר.', severity: 'info', icon: 'receipt', order: 2, isActive: true },
  { id: 'overages_local', title: 'חריגות בארץ - חיוב באשראי אישי', content: 'חריגה מהמכסה החודשית בארץ תגרור חיוב ישיר מכרטיס האשראי האישי: • גלישה: 0.85 ₪ לכל GB חריגה • שיחות: 4.2 אגורות לכל דקה • SMS/MMS: 0.85 אגורה לכל הודעה', severity: 'danger', icon: 'alert-triangle', order: 3, isActive: true },
  { id: 'international_prefix', title: 'שיחות לחו"ל מהארץ - קידומת 014 בלבד', content: 'חיוג לחו"ל במסגרת המכסה יתבצע אך ורק בקידומת 014 של בזק בינלאומי. חיוג בכל קידומת אחרת (012, 013 וכו\') יגרור חיובים כבדים ישירות מכרטיס האשראי של העובד - מחוץ למסגרת המכרז.', severity: 'danger', icon: 'phone-call', order: 4, isActive: true },
  { id: 'delivery_fee', title: 'דמי שליחות וביטול הזמנה', content: 'עובדים ממדרג תיכון ומטה יחויבו ב-50.42 ₪ עבור משלוח המכשיר. ביטול שליחות שתואמה חייב להתבצע לפחות 2 ימי עסקים מראש. אי-ביטול בזמן יגרור חיוב מלא בעלות השליחות - גם אם המכשיר לא הגיע פיזית.', severity: 'warning', icon: 'truck', order: 5, isActive: true },
  { id: 'cancellation_policy', title: 'ביטול עסקה - תנאים מחמירים', content: 'ביטול עסקה ייתאפשר תוך 14 ימי עסקים מיום האספקה, אך ורק אם: האריזה המקורית לא נפתחה, לא נעשה שום שימוש במכשיר. פתיחת האריזה מבטלת את הזכות לחרטה לחלוטין - גם אם המכשיר לא הופעל.', severity: 'warning', icon: 'package-x', order: 6, isActive: true },
  { id: 'lost_device_refund', title: 'מציאת מכשיר אבוד - זכות להחזר', content: 'עובד ששילם דמי השתתפות עצמית על אובדן וקיבל מכשיר חלופי, ולאחר מכן מצא את המקורי - יכול להחזיר את המכשיר החלופי לספק ולקבל 75% החזר מדמי ההשתתפות ששילם.', severity: 'info', icon: 'search', order: 7, isActive: true },
  { id: 'express_repair', title: 'תיקון אקספרס ועד הבית', content: 'תיקון מהיר (עד שעתיים) בתחנת שירות - תוספת עלות 65.60 ₪. תיקון במקום העבודה או מגורים - עלות 121.00 ₪. תשלומים אלו מבוצעים ישירות מכרטיס האשראי האישי ואינם חלק מכיסוי הביטוח הבסיסי.', severity: 'info', icon: 'wrench', order: 8, isActive: true },
  { id: 'byod_insurance', title: 'ביטוח למכשיר פרטי (BYOD)', content: 'מסלול SIM ONLY מאפשר ביטוח למכשיר אישי בעלות 7.06 ₪ לחודש (למעט יבוא מקביל). הצטרפות לביטוח לאחר שחלפו 60 יום מרכישת המכשיר תגרור קנס בדיקה חד-פעמי של 75.60 ₪.', severity: 'info', icon: 'shield-alert', order: 9, isActive: true },
  { id: 'roaming_exceptions', title: 'חריגות והתאפסות גלישה בחו"ל', content: 'לכל עובד בנק גלישה בחו"ל של 10GB בחודש המצטבר עד 120GB בשנה ומתאפס בכל שנה קלנדרית. בסיום הנפח תופעל חסימה אוטומטית (Hard Stop). ניתן לרכוש הרחבות באשראי אישי.', severity: 'info', icon: 'globe', order: 10, isActive: true },
  { id: 'out_of_pocket', title: 'שירותים במימון אישי מלא (ללא השתתפות)', content: 'שירות מוגן "נתיב" (35.30 ₪), שלוחה לקו קיים/שעון (8.1 ₪), וקו גיבוי נפרד (85.2 ₪ לשנה) אינם נכללים במכסת ההשתתפות המשרדית ויחויבו במלואם מכרטיס האשראי האישי של העובד.', severity: 'danger', icon: 'alert-triangle', order: 11, isActive: true },
  { id: 'charger_included', title: 'מטען קיר כלול בערכה', content: 'שימו לב: ערכת המכשיר שתסופק לכם כוללת מטען קיר בהספק 20W. אין צורך לרכוש מטען בנפרד אלא אם נדרש מטען נוסף.', severity: 'success', icon: 'plug', order: 12, isActive: true }
];

export const FALLBACK_GUIDE = [
  {
    id: 'sim_only_plan',
    section: 'plans',
    title: 'תוכנית סים-אונלי/SIM Only',
    subtitle: 'מסלול קו בלבד',
    items: 'שירות קו בלבד, ללא מכשיר | ללא התחייבות לתקופה | אפשרות הוספת שירות תיקונים מקיף למכשיר פרטי, בתוספת 7.06 ₪, כולל מע"מ, מתוך יתרת מכסת ההשתתפות. (BYOD – Bring Your Own Device)',
    footer: '',
    style: 'light',
    icon: 'CreditCard',
    badge: '',
    order: 1,
    isActive: true
  },
  {
    id: 'leasing_plan',
    section: 'plans',
    title: 'תוכנית ליסינג (לתקופה של 24 חודשים)',
    subtitle: 'המסלול מכיל מעטפת שירותים לכל תקופת ההתקשרות:',
    items: '7,500 דקות + 7,500 הודעות SMS/MMS | גלישה בארץ: 1 טרה-בייט (1TB) | עם המכשיר מסופק מטען חשמלי בהספק של 20 וואט | חבילת חו"ל: 10GB חודשי מצטבר, (עד 120GB שנתי -אתחול ואיפוס בכל שנה קלנדרית) + 50 דק\'/הודעות | החבילה תופעל אוטומטית עם הגעת העובד לחו"ל | שירות תיקונים מקיף לכל תקופת הליסינג | חובה: צימוד סים (SIM Pairing) טכנולוגי - הצימוד יופעל לאחר 5 ימים ממועד האספקה כדי לאפשר העברת נתונים',
    footer: 'החברות הזוכות: פלאפון (60%) ופרטנר (40%). ניתן גם לבקש קו גיבוי נפרד בחברה השנייה ב-85.20 ₪ לשנה.',
    style: 'dark',
    icon: 'Smartphone',
    badge: '',
    order: 2,
    isActive: true
  },
  {
    id: 'kosher_plan',
    section: 'plans',
    title: 'ליסינג כשר',
    subtitle: 'טלפון לחצנים מאושר',
    items: 'מכשיר לחצנים בעלות 26.20 ₪ לחודש, כולל מע"מ | שיחות בלבד',
    footer: 'מאושר מבחינה הלכתית לפי החלטת ועדת רבנים.',
    style: 'light',
    icon: 'Shield',
    badge: 'מאושר ועדת רבנים',
    order: 3,
    isActive: true
  },
  {
    id: 'protected_service',
    section: 'plans',
    title: 'שירות מוגן "נתיב"',
    subtitle: 'אינטרנט מסונן',
    items: 'תוספת של 35.30 ₪ לחודש, כולל מע"מ מעבר לעלות המכשיר | מותנה בהתחייבות ל-24 חודשים | אינטרנט מסונן ומאובטח',
    footer: 'מיועד לעובדים הדורשים סינון תוכן. יש לבקש בעת הזמנת המכשיר.',
    style: 'light',
    icon: 'ShieldCheck',
    badge: '',
    order: 4,
    isActive: true
  },
  {
    id: 'smartwatch_line',
    section: 'plans',
    title: 'תוספות וקווים נוספים',
    subtitle: 'אביזרים ושירותים',
    items: 'קו לשעון חכם/רכב - 8.10 ₪ לחודש, כולל מע"מ | קו גיבוי בחברה השנייה - 85.20 ₪ לשנה, כולל מע"מ',
    footer: 'ניתן להוסיף עד לגובה יתרת הזכאות החודשית.',
    style: 'light',
    icon: 'Watch',
    badge: '',
    order: 5,
    isActive: true
  },
  {
    id: 'delivery_rules',
    section: 'instructions',
    title: 'עלות וביטול שליחות',
    subtitle: '',
    items: 'עובדים ממדרג תיכון ומטה: עלות שליחות 50.42 ₪ | ביטול שליחות: חובה לעדכן לכל הפחות 2 ימי עסקים לפני מועד הגעה | אי-ביטול במועד = חיוב מלא גם אם המכשיר לא התקבל',
    footer: '',
    style: 'warning',
    icon: 'Truck',
    badge: '',
    order: 6,
    isActive: true
  },
  {
    id: 'return_rules',
    section: 'instructions',
    title: 'ביטול עסקה',
    subtitle: '',
    items: 'החזרה אפשרית תוך 14 ימי עסקים מיום האספקה | תנאי: האריזה המקורית לא נפתחה ולא נעשה שימוש | פתיחת אריזה = ביטול זכות ההחזרה',
    footer: '',
    style: 'warning',
    icon: 'RotateCcw',
    badge: '',
    order: 7,
    isActive: true
  },
  {
    id: 'sim_pairing',
    section: 'instructions',
    title: 'צימוד סים (SIM Pairing)',
    subtitle: '',
    items: 'נעילה טכנולוגית: הסים נעול למכשיר | העברת נתונים מהמכשיר הישן: הנעילה נדחית ב-5 ימי עסקים | לאחר 5 ימים - הסים לא יפעל במכשיר אחר',
    footer: '',
    style: 'light',
    icon: 'Link2',
    badge: '',
    order: 8,
    isActive: true
  },
  {
    id: 'partner_migration',
    section: 'instructions',
    title: 'מעבר לפרטנר (בעלי קו פלאפון ישן)',
    subtitle: '',
    items: 'בעלי קו פלאפון הישן מהמכרז הישן, מחויבים להציג אסמכתא שביטלו/העבירו בעלות לקו הישן | אי הצגת אסמכתא מהאספקה תוך 24 שעות – תגרור ניתוק אוטומטי של הקו הישן ע"י המשרד',
    footer: '',
    style: 'warning',
    icon: 'Shuffle',
    badge: '',
    order: 9,
    isActive: true
  },
  {
    id: 'backup_data',
    section: 'instructions',
    title: 'גיבוי נתונים - אחריות העובד',
    subtitle: '',
    items: 'העובד נדרש לגבות עצמאית את התוכן האישי ממכשיר הליסינג טרם השדרוג / ניוד (מידע כגון: התמונות, אנשי הקשר ו-WhatsApp וכד\'...)',
    footer: '',
    style: 'light',
    icon: 'Database',
    badge: '',
    order: 10,
    isActive: true
  },
  {
    id: 'roaming_packages',
    section: 'roaming',
    title: 'הרחבות חבילות חו"ל לשימוש אישי',
    subtitle: '',
    items: 'ניתן לרכוש עצמאית , ללא הגבלה, חבילות הרחבה לגלישה בחו"ל, (כגון: 5GB ב-5 ₪ או 20GB ב-13 ₪, כולל מע"מ).',
    footer: '',
    style: 'cyan',
    icon: 'Globe2',
    badge: '',
    order: 11,
    isActive: true
  },
  {
    id: 'zero_rating',
    section: 'roaming',
    title: 'Zero-Rating באפליקציות שירות',
    subtitle: '',
    items: 'WhatsApp, Facebook, Instagram | Waze, Google Maps | הגלישה לאפליקציות אלו אינה יורדת מנפח החבילה',
    footer: '',
    style: 'cyan',
    icon: 'CheckCircle2',
    badge: '',
    order: 12,
    isActive: true
  },
  {
    id: 'hard_stop',
    section: 'roaming',
    title: 'חסימה אוטומטית למניעת חריגות',
    subtitle: '',
    items: 'לאחר סיום נפח הגלישה המצטבר. הגלישה תחסם לחלוטין. מנויים יקבלו התראה בניצול 75% ו-100% מנפח החבילה.',
    footer: '',
    style: 'danger',
    icon: 'ShieldAlert',
    badge: '',
    order: 13,
    isActive: true
  },
  {
    id: 'overseas_calls',
    section: 'roaming',
    title: 'שיחות לחו"ל מהארץ',
    subtitle: '',
    items: 'חיוג לחו"ל: חובה להשתמש בקידומת 014 של בזק בינלאומי | שיחות בחבילה: 50 דקות/הודעות לחו"ל | חיוג בקידומת אחרת = חיוב כבד ישירות מהאשראי',
    footer: '',
    style: 'danger',
    icon: 'PhoneCall',
    badge: '',
    order: 14,
    isActive: true
  },
  {
    id: 'call_filtering',
    section: 'roaming',
    title: 'שירות סינון שיחות',
    subtitle: '',
    items: 'בהיותו בחו"ל, השירות מאפשר לעובד חסימה של שיחות נכנסות, באמצעות קוד אישי | השירות תקף ללא עלות.',
    footer: '',
    style: 'cyan',
    icon: 'ShieldCheck',
    badge: '',
    order: 15,
    isActive: true
  }
];

export const FALLBACK_TERMINATION_RULES = [
  { id: 'term_1', title: 'סיום ליסינג רגיל (24 חודשים)', content: 'בסיום 24 חודשים המכשיר נשאר ברשות העובד ללא עלות נוספת.', category: 'רגיל', icon: 'check-circle', order: 1, isActive: true },
  { id: 'term_2', title: 'עזיבת המשרד', content: 'עובד העוזב את המשרד נדרש להחזיר את המכשיר או לרכוש אותו בעלות הרכישה הנותרת.', category: 'עזיבה', icon: 'alert-triangle', order: 2, isActive: true },
  { id: 'term_3', title: 'שדרוג מוקדם', content: 'שדרוג לפני תום 24 חודשים דורש אישור מיוחד וסגירת התחייבות קודמת (תשלום הקנס).', category: 'שדרוג', icon: 'refresh-cw', order: 3, isActive: true }
];
