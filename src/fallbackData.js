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
  { id: 'masad', label: "מדרג מסד", desc: "עובדים במתחי דרגות שסיומם ב-39 ומטה. כולל סטודנטים ואזרחים ותיקים.", allowance: 88.50, restrictToSimOnly: false },
  { id: 'other', label: "מדרג אחר (SIM ONLY)", desc: "זכאים רק לחבילת סלולר ללא מכשיר, בהתאם לשיקול דעת המשרד.", allowance: 11.06, restrictToSimOnly: true },
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
];

export const FALLBACK_MAINTENANCE = [
  { tier: "מכשיר לחצנים (Feature Phone)", screen1: "50.40 ₪", screen2: "50.40 ₪", theft1: "100.10 ₪", disable1: "100.10 ₪" },
  { tier: "מכשיר עד 2,000 ₪", screen1: "110.10 ₪", screen2: "302.50 ₪", theft1: "504.00 ₪", disable1: "403.00 ₪" },
  { tier: "מכשיר עד 3,500 ₪", screen1: "110.10 ₪", screen2: "403.00 ₪", theft1: "1,664.00 ₪", disable1: "1,210.00 ₪" },
  { tier: "מכשיר עד 5,000 ₪", screen1: "110.10 ₪", screen2: "605.00 ₪", theft1: "2,269.00 ₪", disable1: "1,613.70 ₪" },
  { tier: "מכשיר מעל 5,000 ₪", screen1: "110.10 ₪", screen2: "807.00 ₪", theft1: "3,025.70 ₪", disable1: "50% מהמחיר" },
];

export const FALLBACK_FAQ = [
  { question: 'האם אני עובר לפרטנר או לפלאפון?', answer: 'המכרז פוצל: פלאפון זכתה ב-60% מהמנויים, ופרטנר ב-40%.', order: 1 },
  { question: 'מתי מתחיל החיוב על המכשיר החדש?', answer: 'החיוב מתחיל באופן רשמי רק לאחר ביצוע השדרוג בפועל.', order: 2 },
  { question: 'האם מספר הטלפון משתנה בעקבות הניוד?', answer: 'לא. מספר המנוי הנוכחי שלך נשמר במלואו בדיוק כפי שהוא.', order: 3 },
  { question: 'למי פונים אם אני לא מופיע ברשימת הזכאים?', answer: 'יש לפנות אך ורק למנהלן/אחראי הסלולר במשרדך לבירור ועדכון הסטטוס.', order: 4 },
  { question: 'מהו צימוד סים (SIM Pairing)?', answer: 'כרטיס ה-SIM משויך טכנולוגית באופן בלעדי למכשיר הליסינג. הכנסת הסים למכשיר אחר תגרום להשהיית הקו.', order: 5 },
  { question: 'מה קורה למידע האישי שלי במכשיר הישן?', answer: 'באחריותך הבלעדית לגבות עצמאית ענן טרם מסירת המכשיר.', order: 6 },
  { question: 'מתי עלי להחזיר את המכשיר הישן?', answer: 'יש להחזיר את המכשיר הישן לחברת פלאפון תוך 14 ימי עסקים בלבד. אי החזרה תוביל לחיוב מלא.', order: 7 },
  { question: 'האם שירות תיקונים כלול בעלות?', answer: 'במסלול ליסינג - כן. במסלול SIM Only - ניתן לרכוש שירות בתוספת 7.06 ₪.', order: 8 },
  { question: 'מה קורה אם המכשיר אובד או נגנב?', answer: 'המכשיר ייחסם. קיימת השתתפות עצמית לקבלת מכשיר חלופי לפי מחירון התחזוקה.', order: 9 },
  { question: 'כיצד מחושב שווי המס על השימוש במכשיר וההטבות?', answer: 'לפי הנמוך מבין: מחצית מעלות החבילה או סכום קבוע. על רכישת ציוד נלווה חלה זקיפת מס מלאה.', order: 10 },
];

export const FALLBACK_SETTINGS = {
  app_title: 'מכרז סלולר 2026',
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
