// =============================================================
//  fallbackData.js — נתוני ברירת מחדל (Fallback)
//  אלו הנתונים שיוצגו אם Google Sheets לא זמין
//  מכרז מרכזי 01-2024 | עודכן: 06.2026
// =============================================================

// ─────────────────────────────────────────────────────────────
//  דירוגי זכאות
// ─────────────────────────────────────────────────────────────
export const FALLBACK_TIERS = [
  { id: 'bachir_a', label: "מדרג בכיר א'", desc: "מנכ\"לים ומוקבלי מנכ\"לים ומעלה בדירוגים השונים.", allowance: 236.00, restrictToSimOnly: false },
  { id: 'bachir_b', label: "מדרג בכיר ב'", desc: "עובדים בסגל בכיר: מתח דרגות 42-44 ומעלה בדירוג המח\"ר או במתח מקביל.", allowance: 177.00, restrictToSimOnly: false },
  { id: 'tichon', label: "מדרג תיכון", desc: "עובדים במתחי דרגות שסיומם בדרגה 42 או 43 בדירוג המח\"ר, או במתח מקביל.", allowance: 118.00, restrictToSimOnly: false },
  { id: 'merav', label: "מדרג מירב", desc: "עובדים במתחי דרגות שסיומם בדרגה 40 או 41 בדירוג המח\"ר, או במתח מקביל.", allowance: 88.50, restrictToSimOnly: false },
  { id: 'masad', label: "מדרג מסד", desc: "עובדים במתחי דרגות שסיומם ב-39 ומטה. כולל סטודנטים ואזרחים ותיקים (עודכן ב-v1.5).", allowance: 88.50, restrictToSimOnly: false },
  { id: 'other', label: "מדרג אחר (SIM ONLY)", desc: "קבוצת עובדים הזכאים רק לחבילת סלולר ללא מכשיר, בהתאם לשיקול דעת המשרד.", allowance: 11.06, restrictToSimOnly: true },
  { id: 'exception', label: "מדרג חריג (ללא השתתפות)", desc: "מכסה זמנית: חל\"ת, השעיה, שליחות. המכשיר ע\"ח פרטי.", allowance: 0, restrictToSimOnly: false },
];

// ─────────────────────────────────────────────────────────────
//  מכשירים מקומיים (BYOD / כשר / אביזרים)
// ─────────────────────────────────────────────────────────────
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
  { id: 'galaxy_buds4_pro', label: 'Samsung Galaxy Buds 4 Pro (אוזניות)', category: 'אביזרים', totalCost: 26.00 },
];

// ─────────────────────────────────────────────────────────────
//  מחירון תחזוקה ונזקים
// ─────────────────────────────────────────────────────────────
export const FALLBACK_MAINTENANCE = [
  { tier: "מכשיר לחצנים (Feature Phone)", screen1: "50.40 ₪", screen2: "50.40 ₪", theft1: "סגירת התחייבות + ליסינג לחצנים חדש", disable1: "סגירת התחייבות + ליסינג לחצנים חדש" },
  { tier: "מכשיר עד 2,000 ₪", screen1: "110.10 ₪", screen2: "302.50 ₪", theft1: "504.00 ₪", disable1: "403.00 ₪" },
  { tier: "מכשיר עד 3,500 ₪", screen1: "110.10 ₪", screen2: "403.00 ₪", theft1: "1,664.00 ₪", disable1: "1,210.00 ₪" },
  { tier: "מכשיר עד 5,000 ₪", screen1: "110.10 ₪", screen2: "605.00 ₪", theft1: "2,269.00 ₪", disable1: "1,613.70 ₪" },
  { tier: "מכשיר מעל 5,000 ₪", screen1: "110.10 ₪", screen2: "807.00 ₪", theft1: "3,025.70 ₪", disable1: "50% מהמחיר" },
];

// ─────────────────────────────────────────────────────────────
//  שאלות ותשובות — מכרז 01-2024 (מסמך מרוכז מעודכן)
//  type: 'qa'         → שאלות ותשובות פרקטיות
//  type: 'regulation' → הפניות לאתר החשכ"ל (הוראות תכ"ם)
// ─────────────────────────────────────────────────────────────
export const FALLBACK_FAQ = [
  // ── שאלות ותשובות ──
  {
    question: 'מי אחראי לגבות את התמונות וההודעות שלי (כגון WhatsApp) במעבר למכשיר החדש?',
    answer: 'האחריות על גיבוי התכנים האישיים היא אך ורק של העובד. לחברת הסלולר אין שום אחריות על גיבוי התכנים האגורים במכשיר הישן או באפליקציות צד שלישי בעת ההחלפה.',
    type: 'qa', order: 1,
  },
  {
    question: 'האם אוכל לבטל את שדרוג המכשיר לאחר שקיבלתי אותו?',
    answer: 'כן, אך ורק במידה ולא פתחת את האריזה המקורית ולא עשית בו כל שימוש — ניתן להחזיר תוך 14 ימי עסקים מיום האספקה. אם האריזה נפתחה, העסקה סופית ולא ניתנת לביטול.',
    type: 'qa', order: 2,
  },
  {
    question: 'אני רוצה להחזיר את המכשיר כדי לצאת מהתחייבות. האם יש תנאים לכך?',
    answer: 'בהחלט. מכשיר מוחזר חייב להיות במצב תקין — נדלק בקלות, ללא שברים במסך, מערכת אלקטרונית פעילה. חובה לאפס נתונים. במכשירי iPhone — חובה לבטל את שירות "Find My iPhone" לפני ההחזרה, אחרת תחויב במלוא עלות המכשיר.',
    type: 'qa', order: 3,
  },
  {
    question: 'מה קורה לזכאות הסלולר שלי במידה ואצא לחופשת לידה?',
    answer: 'במהלך 15 השבועות הראשונים ההשתתפות המשרדית נשמרת כרגיל. הארכת החופשה מעבר לכך (חל"ת) תאפס את תקרת ההשתתפות ל-0 ₪, ותחויבי במלוא עלות הליסינג באשראי פרטי עד חזרתך לעבודה.',
    type: 'qa', order: 4,
  },
  {
    question: 'מה קורה כאשר אני יוצא לחופשה ללא תשלום (חל"ת) רגילה או שליחות בחו"ל?',
    answer: 'תקרת ההשתתפות המשרדית תאופס ועלות הליסינג תרד מאמצעי התשלום הפרטי שלך. ניתן "להקפיא" את הקו רק לשם שמירת המספר בעלות של 5.10 ₪ בחודש.',
    type: 'qa', order: 5,
  },
  {
    question: 'אני מתכנן לפרוש לגמלאות או לעזוב בעוד 4 חודשים. האם אוכל לשדרג מכשיר כעת?',
    answer: 'לא. עובד שצפוי לסיים העסקה ב-6 החודשים הקרובים אינו זכאי לשדרוג וימשיך עם מכשירו הנוכחי עד העזיבה.',
    type: 'qa', order: 6,
  },
  {
    question: 'האם מותר לי להעביר את קו הליסינג או המכשיר לבן משפחה?',
    answer: 'לא. הציוד נועד לשימוש אישי ופעילות משרדית של העובד בלבד. חל איסור מוחלט להעבירו לאחר.',
    type: 'qa', order: 7,
  },
  {
    question: 'מה קורה לחבילת הגלישה בחו"ל כשהיא מסתיימת?',
    answer: 'כברירת מחדל, המנויים חסומים לגלישה בחריגה אחרי 10GB. תקבלו התראות ב-75% וב-100% מהנפח. ניתן לרכוש חבילות הרחבה באשראי אישי.',
    type: 'qa', order: 8,
  },
  // ── הפניות רגולטוריות ──
  {
    question: 'הוראת תכ"ם 16.7.1.1 — כללי מכרז הסלולר והזכאות',
    answer: 'הוראה זו מגדירה את תנאי ההתקשרות, מדרגי הזכאות ועקרונות חלוקת המנויים. לנוסח המחייב: https://mof.gov.il/agf/tachkemoney/pages/tachkemoney.aspx',
    type: 'regulation', order: 10,
  },
  {
    question: 'הוראת תכ"ם 16.7.1.2 — תנאי שימוש ומדיניות מכשירים',
    answer: 'הוראה זו קובעת את תנאי הליסינג, BYOD, סוגי המכשירים המאושרים ותנאי הביטוח. לנוסח המחייב: אתר החשכ"ל — הוראות תכ"ם 16.7.1.2',
    type: 'regulation', order: 11,
  },
  {
    question: 'הוראת תכ"ם 16.7.1.3 — שירותי חו"ל (Roaming) ו-Zero-Rating',
    answer: 'מגדירה את חבילות הגלישה בחו"ל, אפליקציות Zero-Rating (WhatsApp, Facebook, Waze, Google Maps ועוד) וחסימת גלישה אוטומטית (Hard Stop) בסיום הנפח. לנוסח המחייב: אתר החשכ"ל — הוראות תכ"ם 16.7.1.3',
    type: 'regulation', order: 12,
  },
  {
    question: 'הוראת תכ"ם 16.7.1.4 — שירותי תחזוקה, ביטוח ותיקונים',
    answer: 'קובעת את מחירוני ההשתתפות העצמית, כללי BYOD (מהדגמים המאושרים במכרז בלבד), וההסדר לגבי מכשירי לחצנים. לנוסח המחייב: אתר החשכ"ל — הוראות תכ"ם 16.7.1.4',
    type: 'regulation', order: 13,
  },
];

// ─────────────────────────────────────────────────────────────
//  הגדרות כלליות
// ─────────────────────────────────────────────────────────────
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
  app_version: 'v06.2026',
};

// ─────────────────────────────────────────────────────────────
//  🆕 מדריך והנחיות — תוכן דינמי מ-Google Sheets (Tab: guide)
//  section: 'plans'        → כרטיסי מסלולים (grid 1+2)
//  section: 'instructions' → הנחיות חובה (grid 2 cols)
//  section: 'roaming'      → חבילות חו"ל (grid 3 cols)
//  style: light/dark/warning/cyan/danger
// ─────────────────────────────────────────────────────────────
export const FALLBACK_GUIDE = [
  // ── מסלולים ──
  {
    id: 'sim_only_plan',
    section: 'plans',
    title: 'SIM ONLY',
    subtitle: 'מסלול קו בלבד',
    items: [
      'שירות קו בלבד ב-11.06 ₪ לחודש',
      'ללא התחייבות לתקופה',
      'שירות תיקונים מקיף אופציונלי בתוספת 7.06 ₪',
    ],
    footer: 'מוקצה לעובדים הזכאים רק לחבילת סלולר ללא מכשיר, בהתאם לשיקול דעת המשרד. סטודנטים ואזרחים ותיקים עודכנו למדרג מסד (88.50 ₪/חודש).',
    style: 'light',
    icon: 'CreditCard',
    badge: '',
    order: 1,
  },
  {
    id: 'leasing_plan',
    section: 'plans',
    title: 'תוכנית ליסינג מלאה',
    subtitle: 'התחייבות 24 חודשים',
    items: [
      '7,500 דקות + 7,500 הודעות SMS',
      'גלישה בארץ: 1 טרה-בייט (1TB)',
      'מטען קיר מתנה עם כל מכשיר',
      'חבילת חו"ל: 10GB גלישה + 50 דקות/הודעות (עד 120GB בשנה)',
      'שירות תיקונים מקיף לכל 24 החודשים',
      'חובה: צימוד סים (SIM Pairing) — קו נעול למכשיר',
    ],
    footer: 'החברות הזוכות: פלאפון (60%) ופרטנר (40%). ניתן גם לבקש קו גיבוי נפרד בחברה השנייה ב-85.20 ₪ לשנה.',
    style: 'dark',
    icon: 'Smartphone',
    badge: 'המסלול המומלץ והמקיף ביותר',
    order: 2,
  },
  {
    id: 'kosher_plan',
    section: 'plans',
    title: 'ליסינג כשר',
    subtitle: 'טלפון לחצנים מאושר',
    items: [
      'מכשיר לחצנים בעלות 26.20 ₪ לחודש',
      'מאושר ועדת רבנים',
      'שיחות בלבד — ללא גלישה',
    ],
    footer: 'מאושר מבחינה הלכתית לפי החלטת ועדת רבנים.',
    style: 'light',
    icon: 'Shield',
    badge: 'מאושר ועדת רבנים',
    order: 3,
  },
  {
    id: 'protected_service',
    section: 'plans',
    title: 'שירות מוגן "נתיב"',
    subtitle: 'אינטרנט מסונן',
    items: [
      'תוספת של 35.30 ₪ לחודש מעבר לעלות המכשיר',
      'מותנה בהתחייבות ל-24 חודשים',
      'אינטרנט מסונן ומאובטח',
    ],
    footer: 'מיועד לעובדים הדורשים סינון תוכן. יש לבקש בעת הזמנת המכשיר.',
    style: 'light',
    icon: 'ShieldCheck',
    badge: '',
    order: 4,
  },
  {
    id: 'smartwatch_line',
    section: 'plans',
    title: 'תוספות וקווים נוספים',
    subtitle: 'אביזרים ושירותים',
    items: [
      'קו לשעון חכם/רכב — 8.10 ₪ לחודש',
      'קו גיבוי בחברה השנייה — 85.20 ₪ לשנה',
      'אוזניות אלחוטיות — מתוך יתרת הזכאות',
    ],
    footer: 'ניתן להוסיף עד לגובה יתרת הזכאות החודשית.',
    style: 'light',
    icon: 'Watch',
    badge: '',
    order: 5,
  },
  // ── הנחיות חובה ──
  {
    id: 'delivery_rules',
    section: 'instructions',
    title: 'אספקה ודמי שליחות',
    subtitle: '',
    items: [
      'עובדים ממדרג תיכון ומטה: עלות משלוח 50.42 ₪',
      'ביטול שליחות: חובה לעדכן עד 2 ימי עסקים לפני מועד הגעה',
      'אי-ביטול בזמן = חיוב מלא גם אם המכשיר לא התקבל',
    ],
    footer: '',
    style: 'warning',
    icon: 'Truck',
    badge: '',
    order: 6,
  },
  {
    id: 'return_rules',
    section: 'instructions',
    title: 'ביטול עסקה (חרטה)',
    subtitle: '',
    items: [
      'החזרה אפשרית תוך 14 ימי עסקים מיום האספקה',
      'תנאי: האריזה המקורית לא נפתחה ולא נעשה שימוש',
      'פתיחת אריזה = ביטול זכות ההחזרה',
    ],
    footer: '',
    style: 'warning',
    icon: 'RotateCcw',
    badge: '',
    order: 7,
  },
  {
    id: 'sim_pairing',
    section: 'instructions',
    title: 'צימוד סים (SIM Pairing)',
    subtitle: '',
    items: [
      'נעילה טכנולוגית: הסים נעול למכשיר',
      'העברת נתונים מהמכשיר הישן: הנעילה נדחית ב-5 ימי עסקים',
      'לאחר 5 ימים — הסים לא יפעל במכשיר אחר',
    ],
    footer: '',
    style: 'light',
    icon: 'Link2',
    badge: '',
    order: 8,
  },
  {
    id: 'partner_migration',
    section: 'instructions',
    title: 'מעבר לפרטנר (בעלי קו פלאפון ישן)',
    subtitle: '',
    items: [
      'עובד שמשרדו עבר לפרטנר ובידיו קו פלאפון מהמכרז הישן',
      'חייב להציג אסמכתא שביטל/העביר את הקו הישן לבעלות פרטית',
      'ללא אסמכתא תוך 24 שעות — הקו הישן ינותק אוטומטית',
    ],
    footer: '',
    style: 'warning',
    icon: 'Shuffle',
    badge: '',
    order: 9,
  },
  {
    id: 'backup_data',
    section: 'instructions',
    title: 'גיבוי נתונים — אחריות העובד',
    subtitle: '',
    items: [
      'האחריות על גיבוי תמונות, WhatsApp ואנשי קשר היא של העובד בלבד',
      'יש לגבות לענן לפני שדרוג המכשיר',
      'לחברת הסלולר אין אחריות על אובדן תכנים',
    ],
    footer: '',
    style: 'light',
    icon: 'Database',
    badge: '',
    order: 10,
  },
  // ── חבילות חו"ל ──
  {
    id: 'roaming_packages',
    section: 'roaming',
    title: 'חבילות גלישה גמישות',
    subtitle: '',
    items: [
      '10GB מובנים בחבילה הבסיסית',
      'חבילת הרחבה: 5GB ב-5 ₪',
      'חבילת הרחבה: 20GB ב-13 ₪',
      'ללא הגבלת ימי תוקף לחבילה',
    ],
    footer: '',
    style: 'cyan',
    icon: 'Globe2',
    badge: '',
    order: 11,
  },
  {
    id: 'zero_rating',
    section: 'roaming',
    title: 'Zero-Rating באפליקציות שירות',
    subtitle: '',
    items: [
      'WhatsApp, Facebook, Instagram',
      'Waze, Google Maps',
      'הגלישה לאפליקציות אלו אינה יורדת מנפח החבילה',
    ],
    footer: '',
    style: 'cyan',
    icon: 'CheckCircle2',
    badge: '',
    order: 12,
  },
  {
    id: 'hard_stop',
    section: 'roaming',
    title: 'חסימה אוטומטית (Hard Stop)',
    subtitle: '',
    items: [
      'התראה ב-75% מהנפח',
      'התראה ב-100% מהנפח',
      'חסימה אוטומטית בסיום — לא תצברו חיובים נסתרים',
    ],
    footer: 'ניתן לרכוש חבילת הרחבה באשראי אישי לאחר חסימה.',
    style: 'danger',
    icon: 'ShieldAlert',
    badge: '',
    order: 13,
  },
  {
    id: 'overseas_calls',
    section: 'roaming',
    title: 'שיחות לחו"ל מהארץ',
    subtitle: '',
    items: [
      'חיוג לחו"ל: חובה להשתמש בקידומת 014 של בזק בינלאומי',
      'שיחות בחבילה: 50 דקות/הודעות לחו"ל',
      'חיוג בקידומת אחרת = חיוב כבד ישירות מהאשראי',
    ],
    footer: '',
    style: 'danger',
    icon: 'PhoneCall',
    badge: '',
    order: 14,
  },
];

// ─────────────────────────────────────────────────────────────
//  🆕 דגשים חשובים — מסך חדש (Tab: important_notes)
//  severity: 'danger' → אדום | 'warning' → כתום | 'info' → כחול
// ─────────────────────────────────────────────────────────────
export const FALLBACK_IMPORTANT_NOTES = [
  {
    id: 'credit_card_required',
    title: 'חובת הזנת כרטיס אשראי אישי',
    content: 'חובה להזין כרטיס אשראי אישי במערכת. ללא הסדרת אמצעי תשלום — העובד ייחסם לכל שדרוג עתידי. החיוב באשראי יבוצע בגין עלות ההשתתפות האישית, חריגות, וכל שירות נוסף שאינו מכוסה על ידי המשרד.',
    severity: 'warning',
    icon: 'CreditCard',
    order: 1,
  },
  {
    id: 'tax_benefit',
    title: 'זקיפת הטבה (שווי שימוש) בתלוש השכר',
    content: 'תבוצע זקיפת הטבה בתלוש השכר עבור תוכנית הסלולר (כולל מע"מ) ועבור ציוד קצה נוסף. המשמעות: הסכום ייחשב כהכנסה חייבת במס. מומלץ להתייעץ עם רכזי השכר של המשרד לגבי ההשפעה על תלוש השכר.',
    severity: 'info',
    icon: 'Receipt',
    order: 2,
  },
  {
    id: 'overages_local',
    title: 'חריגות בארץ — חיוב באשראי אישי',
    content: 'כל חריגה מהמכסה החודשית בארץ תגרור חיוב ישיר מכרטיס האשראי האישי:\n• גלישה: 0.85 ₪ לכל GB חריגה\n• שיחות: 4.2 אגורות לכל דקה\n• SMS/MMS: 0.85 אגורה לכל הודעה',
    severity: 'danger',
    icon: 'AlertTriangle',
    order: 3,
  },
  {
    id: 'international_prefix',
    title: 'שיחות לחו"ל מהארץ — קידומת 014 בלבד',
    content: 'חיוג לחו"ל במסגרת המכסה יתבצע אך ורק בקידומת 014 של בזק בינלאומי. חיוג בכל קידומת אחרת (012, 013 וכו\') יגרור חיובים כבדים ישירות מכרטיס האשראי של העובד — מחוץ למסגרת המכרז.',
    severity: 'danger',
    icon: 'PhoneCall',
    order: 4,
  },
  {
    id: 'delivery_fee',
    title: 'דמי שליחות וביטול הזמנה',
    content: 'עובדים ממדרג תיכון ומטה יחויבו ב-50.42 ₪ עבור משלוח המכשיר. ביטול שליחות שתואמה חייב להתבצע לפחות 2 ימי עסקים מראש. אי-ביטול בזמן יגרור חיוב מלא בעלות השליחות — גם אם המכשיר לא הגיע פיזית.',
    severity: 'warning',
    icon: 'Truck',
    order: 5,
  },
  {
    id: 'cancellation_policy',
    title: 'ביטול עסקה — תנאים מחמירים',
    content: 'ביטול עסקה ייתאפשר תוך 14 ימי עסקים מיום האספקה, אך ורק אם: האריזה המקורית לא נפתחה, לא נעשה שום שימוש במכשיר. פתיחת האריזה מבטלת את הזכות לחרטה לחלוטין — גם אם המכשיר לא הופעל.',
    severity: 'warning',
    icon: 'PackageX',
    order: 6,
  },
  {
    id: 'lost_device_refund',
    title: 'מציאת מכשיר אבוד — זכות להחזר',
    content: 'עובד ששילם דמי השתתפות עצמית על אובדן וקיבל מכשיר חלופי, ולאחר מכן מצא את המקורי — יכול להחזיר את המכשיר החלופי לספק ולקבל 75% החזר מדמי ההשתתפות ששילם.',
    severity: 'info',
    icon: 'SearchCheck',
    order: 7,
  },
  {
    id: 'express_repair',
    title: 'תיקון אקספרס ועד הבית',
    content: 'תיקון מהיר (עד שעתיים) בתחנת שירות — תוספת עלות 65.60 ₪. תיקון במקום העבודה או מגורים — עלות 121.00 ₪. תשלומים אלו מבוצעים ישירות מכרטיס האשראי האישי ואינם חלק מכיסוי הביטוח הבסיסי.',
    severity: 'info',
    icon: 'Wrench',
    order: 8,
  },
  {
    id: 'byod_insurance',
    title: 'ביטוח למכשיר פרטי (BYOD)',
    content: 'מסלול SIM ONLY מאפשר ביטוח למכשיר אישי בעלות 7.06 ₪ לחודש (למעט יבוא מקביל). הצטרפות לביטוח לאחר שחלפו 60 יום מרכישת המכשיר תגרור קנס בדיקה חד-פעמי של 75.60 ₪.',
    severity: 'info',
    icon: 'ShieldCheck',
    order: 9,
  },
];

// ─────────────────────────────────────────────────────────────
//  🆕 כללי סיום ליסינג — TerminationScreen (Tab: termination_rules)
//  category: 'end_of_term' / 'early_exit' / 'special_cases' / 'conditions'
// ─────────────────────────────────────────────────────────────
export const FALLBACK_TERMINATION_RULES = [
  // ── תנאי סיום תקין ──
  {
    id: 'end_of_term_options',
    title: 'לאחר 24 חודשים — אפשרויות הסיום',
    content: 'ניתן להחזיר את המכשיר ללא עלות. ניתן לרכוש את המכשיר: מחיר הרכישה פוחת ב-15% מהחודש ה-27 וב-35% מהחודש ה-31. אם לא בוצע שדרוג — דמי הליסינג יופחתו ב-25% החל מהחודש ה-25.',
    category: 'end_of_term',
    icon: 'CheckCircle2',
    order: 1,
  },
  {
    id: 'return_conditions',
    title: 'תנאי סף חובה להחזרת מכשיר',
    content: 'כל מכשיר מוחזר חייב: להיות תקין ולהידלק, מערכת אלקטרונית פעילה, ללא סדקים או שברים במסך. מכשיר שאינו עומד בתנאים — לא יאושר ויחויב עלות מלאה. iPhone: חובה לאפס ולבטל "Find My iPhone" לפני ההחזרה.',
    category: 'conditions',
    icon: 'ClipboardCheck',
    order: 2,
  },
  // ── יציאה מוקדמת ──
  {
    id: 'early_exit_general',
    title: 'יציאה מוקדמת — כלל עובדים',
    content: 'יש להחזיר את המכשיר פיזית לספק תוך 14 ימי עסקים מסיום ההעסקה. אי-החזרה בזמן = חיוב אוטומטי מלא. בהחזרה תקינה — ישלם העובד רק את יתרת חודשי הליסינג (השלמה ל-24 חודשים).',
    category: 'early_exit',
    icon: 'LogOut',
    order: 3,
  },
  {
    id: 'early_exit_6m',
    title: 'עזיבה מתחת ל-6 חודשים',
    content: 'עובד שעוזב טרם חלפו 6 חודשים ורוצה להשאיר את המכשיר ישלם מחיר מחירון מלא ללא הנחת מכרז. שים לב: עובד שידוע כי יעזוב ב-6 החודשים הקרובים אינו זכאי לשדרג מכשיר מראש.',
    category: 'early_exit',
    icon: 'UserMinus',
    order: 4,
  },
  {
    id: 'temporary_workers',
    title: 'עובדים זמניים, סטודנטים וממלאי מקום',
    content: 'אם העסקתכם מסתיימת לפני תום 24 החודשים — תידרשו להשלים מכיסכם את יתרת התשלומים לסיום תקופת הליסינג.',
    category: 'special_cases',
    icon: 'Clock',
    order: 5,
  },
  {
    id: 'employee_death',
    title: 'פטירת עובד',
    content: 'המשרד ישלם את יתרת הליסינג (עד 12 חודשים) ואת עלות המכשיר. המכשיר יעבור ללא עלות למשפחת הנפטר.',
    category: 'special_cases',
    icon: 'Heart',
    order: 6,
  },
];

// ─────────────────────────────────────────────────────────────
//  קטלוג מכשירים ממשלתי
// ─────────────────────────────────────────────────────────────
export const FALLBACK_CATALOG = [
  // Apple iPhone 17e
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
