import { Info, Mail, Phone } from 'lucide-react';

const AccessibilityStatementScreen = () => {
  return (
    <div className="animate-in fade-in max-w-4xl mx-auto relative z-10" style={{ color: 'var(--clr-text-1)' }}>
      <div className="text-center mb-10 pt-4">

        <h1 className="text-4xl font-black mb-3" style={{ color: 'var(--clr-text-1)' }}>
          הצהרת <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">נגישות</span>
        </h1>
        <p className="text-base font-semibold max-w-2xl mx-auto" style={{ color: 'var(--clr-text-2)' }}>
          אנו רואים חשיבות עליונה בהנגשת האתר לאנשים עם מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות ותקן 5568 ברמת AA.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-white/90 dark:bg-[#0B1120] backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[1.5rem] p-6 shadow-xl">
          <h2 className="text-xl font-black mb-4 flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-500 rounded-full"></div>
            פעולות ההנגשה שבוצעו באתר
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed" style={{ color: 'var(--clr-text-2)' }}>
            <li><strong style={{ color: 'var(--clr-text-1)' }}>ניווט מקלדת:</strong> האתר מותאם במלואו לניווט בעזרת מקלדת בלבד (Tab, Enter, חיצים).</li>
            <li><strong style={{ color: 'var(--clr-text-1)' }}>קוראי מסך:</strong> התאמה לתוכנות הקראת מסך כגון NVDA ו-VoiceOver באמצעות שימוש בתגיות ARIA מתאימות.</li>
            <li><strong style={{ color: 'var(--clr-text-1)' }}>מבנה סמנטי:</strong> שימוש נכון בתגיות HTML תקניות (כותרות, רשימות, טפסים) כדי לספק מידע ברור על מבנה הדף.</li>
            <li><strong style={{ color: 'var(--clr-text-1)' }}>ניגודיות צבעים:</strong> התאמת צבעי הטקסט והרקע לפי דרישות התקן כדי לאפשר קריאה נוחה.</li>
            <li><strong style={{ color: 'var(--clr-text-1)' }}>שינוי גודל תצוגה:</strong> תמיכה בהגדלת טקסט עד 200% מבלי לפגוע בפונקציונליות האתר (Reflow).</li>
          </ul>
        </section>

        <section className="bg-white/90 dark:bg-[#0B1120] backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[1.5rem] p-6 shadow-xl">
          <h2 className="text-xl font-black mb-4 flex items-center gap-2">
            <div className="w-2 h-6 bg-cyan-500 rounded-full"></div>
            פרטי יצירת קשר עם רכז נגישות
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--clr-text-2)' }}>
            אנו משקיעים מאמצים רבים בתחזוקת נגישות האתר. אם נתקלתם בבעיה, קושי, או שיש לכם הצעות לשיפור בנושא נגישות, נשמח לשמוע מכם. פנייתכם תטופל בהקדם האפשרי.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 flex items-start gap-3">
              <Mail className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">דואר אלקטרוני לפניות נגישות</span>
                <a href="mailto:accessibility@cellular.gov.il" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">accessibility@cellular.gov.il</a>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10 flex items-start gap-3">
              <Phone className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">טלפון (רכז נגישות)</span>
                <a href="tel:074-1234567" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline" dir="ltr">074-1234567</a>
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs font-medium bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10">
            תאריך עדכון אחרון של הצהרת נגישות זו: <strong>{new Date().toLocaleDateString('he-IL')}</strong>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccessibilityStatementScreen;
