const fs = require('fs');

let content = fs.readFileSync('src/fallbackData.js', 'utf8');

// Remove footer_credit line
content = content.replace(/\s*footer_credit:\s*'דינה שרון \| משרד התקשורת',?\n/, '\n');

// Append missing exports if they don't exist
if (!content.includes('FALLBACK_IMPORTANT_NOTES')) {
  content += `

export const FALLBACK_IMPORTANT_NOTES = [
  { id: 'credit_card_required', title: 'חובת הזנת כרטיס אשראי אישי', content: 'כל עובד חייב להזין כרטיס אשראי במערכת. עובד שלא יסדיר אמצעי תשלום, ייחסם לביצוע שדרוג.', severity: 'danger', icon: 'credit-card', order: 1, isActive: true },
  { id: 'tax_benefit', title: 'זקיפת הטבה למס', content: 'ככלל, תבוצע זקיפת הטבה בתלוש השכר של העובד על תוכנית הסלולר ועל ציוד נוסף (בהתאם להוראות תכ"ם ולחוק).', severity: 'warning', icon: 'receipt', order: 2, isActive: true },
  { id: 'roaming_exceptions', title: 'חריגות גלישה בחו"ל', content: 'במקרה של סיום חבילת הגלישה בחו"ל, תופעל חסימה אוטומטית (Hard Stop) למניעת חיובים חורגים. באחריות העובד לרכוש חבילה נוספת במידת הצורך.', severity: 'info', icon: 'globe', order: 3, isActive: true },
  { id: 'byod_policy', title: 'מדיניות BYOD (הבא מכשירך)', content: 'עובד רשאי להשתמש במכשיר פרטי (SIM Only) ולקבל החזר כספי. המכשיר חייב לתמוך בדרישות האבטחה של המשרד.', severity: 'info', icon: 'smartphone', order: 4, isActive: true },
  { id: 'stolen_device', title: 'אובדן או גניבת מכשיר', content: 'יש לדווח באופן מיידי לחברת הסלולר ולחשב המשרד. במקרה של אובדן או גניבה, העובד יישא בהשתתפות עצמית לפי מחירון הנזקים.', severity: 'danger', icon: 'shield-alert', order: 5, isActive: true },
  { id: 'private_calls', title: 'שיחות לחו"ל ושירותי פרימיום', content: 'שיחות לחו"ל ושירותי פרימיום חסומים כברירת מחדל. ניתן לפתוח את השירות באישור מיוחד מול חשבות המשרד, בכפוף לחיוב העובד.', severity: 'warning', icon: 'phone-call', order: 6, isActive: true }
];

export const FALLBACK_GUIDE = [
  { id: 'plan_choose', section: 'תהליך בחירת מסלול', title: '1. בחירת מדרג וזכאות', subtitle: 'איך יודעים לאיזה מדרג אני שייך?', items: 'בדוק את המדרג שלך מול משאבי אנוש|הזכאות נקבעת לפי דרגה ודירוג|ניתן לעדכן מדרג במקרה של קידום', footer: 'הזכאות מתעדכנת אוטומטית במערכת.', style: 'default', icon: 'user', badge: 'שלב 1', order: 1, isActive: true },
  { id: 'plan_order', section: 'תהליך בחירת מסלול', title: '2. ביצוע ההזמנה', subtitle: 'איך מזמינים מכשיר?', items: 'היכנס לפורטל ההזמנות|בחר את המכשיר המבוקש|אשר את תנאי הליסינג', footer: 'זמן אספקה משוער: עד 14 ימי עסקים.', style: 'default', icon: 'shopping-cart', badge: 'שלב 2', order: 2, isActive: true },
  { id: 'roaming_info', section: 'גלישה בחו"ל', title: 'מידע על חבילות חו"ל', subtitle: 'מה כלול בחבילה?', items: 'נפח גלישה מוגדר מראש|אפליקציות Zero-Rating|חסימה אוטומטית בסיום החבילה', footer: 'ניתן לרכוש חבילות הרחבה בחיוב כרטיס אשראי אישי.', style: 'warning', icon: 'globe', badge: '', order: 3, isActive: true }
];

export const FALLBACK_TERMINATION_RULES = [
  { id: 'term_1', title: 'סיום ליסינג רגיל (24 חודשים)', content: 'בסיום 24 חודשים המכשיר נשאר ברשות העובד ללא עלות נוספת.', category: 'רגיל', icon: 'check-circle', order: 1, isActive: true },
  { id: 'term_2', title: 'עזיבת המשרד', content: 'עובד העוזב את המשרד נדרש להחזיר את המכשיר או לרכוש אותו בעלות הרכישה הנותרת.', category: 'עזיבה', icon: 'alert-triangle', order: 2, isActive: true },
  { id: 'term_3', title: 'שדרוג מוקדם', content: 'שדרוג לפני תום 24 חודשים דורש אישור מיוחד וסגירת התחייבות קודמת (תשלום הקנס).', category: 'שדרוג', icon: 'refresh-cw', order: 3, isActive: true }
];
`;
}

fs.writeFileSync('src/fallbackData.js', content);
console.log('Successfully updated fallbackData.js');
