# 📋 מדריך הגדרת Google Sheets — מכרז סלולר 2026

## שלב 1: יצירת Google Sheet

1. גש אל [sheets.google.com](https://sheets.google.com)
2. לחץ **"+ חדש"** → **"גיליון אלקטרוני ריק"**
3. שנה את שם הקובץ ל: `cellular-app-data`

---

## שלב 2: יצירת 5 גליונות (Sheets)

בתחתית המסך תראה **"גיליון1"**. צור 5 גליונות עם השמות הבאים (לחץ + להוסיף):

| שם הגליון | תוכן |
|-----------|------|
| `devices` | רשימת המכשירים והמחירים |
| `tiers` | דירוגי זכאות |
| `maintenance` | מחירון תחזוקה |
| `faq` | שאלות ותשובות |
| `settings` | הגדרות כלליות |

> ⚠️ **חשוב:** שמות הגליונות חייבים להיות **בדיוק** כפי שמופיע בטבלה (אותיות קטנות באנגלית)

---

## שלב 3: מבנה כל גליון

### גליון `devices`

| id | label | category | totalCost | isActive |
|----|-------|----------|-----------|---------|
| sim_only | מסלול ללא מכשיר (SIM Only) | מסלולים אישיים (BYOD) | 11.06 | TRUE |
| sim_only_repair | מסלול SIM Only + שירות תיקונים | מסלולים אישיים (BYOD) | 18.12 | TRUE |
| ip17_256 | Apple iPhone 17 (256GB) | Apple iPhone - סדרת 17 | 73.56 | TRUE |
| ip17_air_256 | Apple iPhone 17 Air (256GB) | Apple iPhone - סדרת 17 | 74.78 | TRUE |
| ip17_pro_256 | Apple iPhone 17 Pro (256GB) | Apple iPhone - סדרת 17 | 90.49 | TRUE |
| ip17_pro_512 | Apple iPhone 17 Pro (512GB) | Apple iPhone - סדרת 17 | 98.07 | TRUE |
| ip17_promax_256 | Apple iPhone 17 Pro Max (256GB) | Apple iPhone - סדרת 17 | 93.06 | TRUE |
| ip17_promax_512 | Apple iPhone 17 Pro Max (512GB) | Apple iPhone - סדרת 17 | 103.76 | TRUE |
| ip17_promax_1t | Apple iPhone 17 Pro Max (1TB) | Apple iPhone - סדרת 17 | 113.51 | TRUE |
| s25_fe_256 | Samsung Galaxy S25 FE (256GB) | Samsung Galaxy - סדרת S25 | 74.00 | TRUE |
| s25_256 | Samsung Galaxy S25 (256GB) | Samsung Galaxy - סדרת S25 | 82.34 | TRUE |
| s25_plus_256 | Samsung Galaxy S25 Plus (256GB) | Samsung Galaxy - סדרת S25 | 88.62 | TRUE |
| s25_plus_512 | Samsung Galaxy S25 Plus (512GB) | Samsung Galaxy - סדרת S25 | 95.60 | TRUE |
| s25_ultra_256 | Samsung Galaxy S25 Ultra (256GB) | Samsung Galaxy - סדרת S25 | 105.00 | TRUE |
| s25_ultra_512 | Samsung Galaxy S25 Ultra (512GB) | Samsung Galaxy - סדרת S25 | 112.93 | TRUE |
| s25_ultra_1t | Samsung Galaxy S25 Ultra (1TB) | Samsung Galaxy - סדרת S25 | 130.52 | TRUE |
| zflip7_256 | Samsung Galaxy Z Flip 7 (256GB) | Samsung Galaxy - מתקפלים (Z) | 95.61 | TRUE |
| zflip7_512 | Samsung Galaxy Z Flip 7 (512GB) | Samsung Galaxy - מתקפלים (Z) | 107.10 | TRUE |
| zfold7_256 | Samsung Galaxy Z Fold 7 (256GB) | Samsung Galaxy - מתקפלים (Z) | 150.83 | TRUE |
| zfold7_512 | Samsung Galaxy Z Fold 7 (512GB) | Samsung Galaxy - מתקפלים (Z) | 157.42 | TRUE |
| a26_128 | Samsung Galaxy A26 5G (128GB) | Samsung Galaxy - סדרת A | 49.48 | TRUE |
| a36_128 | Samsung Galaxy A36 5G (128GB) | Samsung Galaxy - סדרת A | 52.24 | TRUE |
| a56_256 | Samsung Galaxy A56 5G (256GB) | Samsung Galaxy - סדרת A | 60.49 | TRUE |
| kosher_phone | מכשיר כשר מאושר ועדה (שיחות בלבד) | מכשירים כשרים (לחצנים) | 26.20 | TRUE |

**עמודות:**
- `id` — מזהה ייחודי (אל תשנה!)
- `label` — שם המכשיר כפי שיוצג
- `category` — קטגוריה (מקבצת מכשירים ביחד)
- `totalCost` — עלות חודשית כוללת (מספר בלבד, ללא ₪)
- `isActive` — TRUE להצגה, FALSE להסתרה ממשתמשים

---

### גליון `tiers`

| id | label | desc | allowance | restrictToSimOnly |
|----|-------|------|-----------|-------------------|
| bachir_a | מדרג בכיר א' | מנכ"לים ומוקבלי מנכ"לים ומעלה בדירוגים השונים. | 236 | FALSE |
| bachir_b | מדרג בכיר ב' | עובדים בסגל בכיר: מתח דרגות 42-44 ומעלה בדירוג המח"ר או במתח מקביל. | 177 | FALSE |
| tichon | מדרג תיכון | עובדים במתחי דרגות שסיומם בדרגה 42 או 43 בדירוג המח"ר, או במתח מקביל. | 118 | FALSE |
| merav | מדרג מירב | עובדים במתחי דרגות שסיומם בדרגה 40 או 41 בדירוג המח"ר, או במתח מקביל. | 88.5 | FALSE |
| masad | מדרג מסד | עובדים במתחי דרגות שסיומם ב-39 ומטה. כולל סטודנטים ואזרחים ותיקים. | 88.5 | FALSE |
| other | מדרג אחר (SIM ONLY) | זכאים רק לחבילת סלולר ללא מכשיר, בהתאם לשיקול דעת המשרד. | 11.06 | TRUE |
| exception | מדרג חריג (ללא השתתפות) | מכסה זמנית: חל"ת, השעיה, שליחות. המכשיר ע"ח פרטי. | 0 | FALSE |

---

### גליון `maintenance`

| tier | screen1 | screen2 | theft1 | disable1 |
|------|---------|---------|--------|---------|
| מכשיר לחצנים (Feature Phone) | 50.40 ₪ | 50.40 ₪ | 100.10 ₪ | 100.10 ₪ |
| מכשיר עד 2,000 ₪ | 110.10 ₪ | 302.50 ₪ | 504.00 ₪ | 403.00 ₪ |
| מכשיר עד 3,500 ₪ | 110.10 ₪ | 403.00 ₪ | 1,664.00 ₪ | 1,210.00 ₪ |
| מכשיר עד 5,000 ₪ | 110.10 ₪ | 605.00 ₪ | 2,269.00 ₪ | 1,613.70 ₪ |
| מכשיר מעל 5,000 ₪ | 110.10 ₪ | 807.00 ₪ | 3,025.70 ₪ | 50% מהמחיר |

---

### גליון `faq`

| question | answer | order | isActive |
|---------|---------|-------|---------|
| האם אני עובר לפרטנר או לפלאפון? | המכרז פוצל: פלאפון זכתה ב-60% מהמנויים, ופרטנר ב-40%. | 1 | TRUE |
| מתי מתחיל החיוב על המכשיר החדש? | החיוב מתחיל באופן רשמי רק לאחר ביצוע השדרוג בפועל. | 2 | TRUE |
| ... (המשך השאלות) | ... | ... | TRUE |

---

### גליון `settings` — שורת key + value

| key | value |
|-----|-------|
| app_title | מכרז סלולר 2026 |
| vat_rate | 18 |
| lease_months | 24 |
| footer_credit | דינה שרון \| משרד התקשורת |
| show_announcement | FALSE |
| announcement_text | (כאן תכתוב הודעה חשובה לעובדים) |
| announcement_type | info |

**ערכי `announcement_type`:** `info` / `warning` / `error` / `success`

> 💡 **טיפ:** כדי להציג הודעה חשובה — שנה `show_announcement` ל-`TRUE` ומלא את `announcement_text`. ההודעה תוצג מיידית לכל המשתמשים.

---

## שלב 4: הגדרת שיתוף ציבורי (קריאה בלבד)

1. לחץ **"שיתוף"** (כפתור כחול בפינה הימנית עליונה)
2. לחץ **"שנה לכל מי שיש לו קישור"**
3. ודא שההרשאה: **"צופה"** (לא עורך!)
4. לחץ **"אישור"**

---

## שלב 5: העתקת ה-Sheet ID

כתובת ה-URL של ה-Sheet נראית כך:
```
https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/edit
```

ה-**Sheet ID** הוא המחרוזת הארוכה בין `/d/` לבין `/edit`.

**עדכן את הקובץ** `src/config.js`:
```js
export const SHEET_ID = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // ← ה-ID שלך כאן
```

---

## שלב 6: בנה ופרוס מחדש

```bash
npm run build
```

לאחר מכן דחוף ל-GitHub — ה-CI/CD יפרוס אוטומטית.

---

## 🔄 כיצד מנהל מעדכן נתונים?

1. פותח את ה-Google Sheet
2. משנה את הערך הרצוי (מחיר, מכשיר, הודעה...)
3. שומר (Ctrl+S) — הכל שמור אוטומטית
4. **הנתונים יופיעו באפליקציה תוך 30 דקות** (Cache)
5. לרענון מיידי — לחץ על כפתור ♻️ בתפריט האפליקציה

---

## ❓ שאלות נפוצות למנהל

**שאלה: הוספתי מכשיר חדש, מתי יופיע?**
תוך 30 דקות, או מיידי עם לחיצה על כפתור הרענון באפליקציה.

**שאלה: איך מסתירים מכשיר מבלי למחוק אותו?**
שנה את ה-`isActive` שלו ל-`FALSE`.

**שאלה: איך מוסיפים שאלה חדשה לשאלות ותשובות?**
הוסף שורה חדשה בגליון `faq`, מלא שאלה, תשובה, מספר סדר, ו-`TRUE` ב-isActive.

**שאלה: האפליקציה לא מתעדכנת!**
בדוק שה-Sheet משותף כ"צופה" לכל מי שיש קישור.
