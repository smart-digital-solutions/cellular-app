import {
  Sparkles, Globe2, Phone, Plug, Wrench, ShieldAlert,
  CreditCard, Smartphone, CheckCircle2, Clock, Database,
  Watch, UserPlus, PackageX, Truck, Ban
} from 'lucide-react';

const GuideScreen = () => (
  <div className="space-y-8 animate-in fade-in duration-700 relative z-10 max-w-6xl mx-auto" style={{ color: 'var(--clr-text-1)' }}>
    <div className="text-center max-w-3xl mx-auto mb-10 pt-4">
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-[#4F46E5] dark:text-indigo-300 font-bold text-xs mb-4 border border-indigo-100 dark:border-indigo-800"><Sparkles className="w-3.5 h-3.5" aria-hidden="true" /> הדרכה רשמית</div>
      <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight" style={{ color: 'var(--clr-text-1)' }}>המדריך למכרז <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">2026</span></h2>
      <p className="text-base font-medium opacity-80" style={{ color: 'var(--clr-text-2)' }}>ריכזנו עבורך את כל המידע הקריטי מתוך תקציר השירותים הממשלתי. השוואת מסלולים, חוקי ברזל לשימוש והנחיות התקשרות.</p>
    </div>

    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-1 premium-glass rounded-[2rem] border p-6 flex flex-col transition-shadow duration-300 hover:shadow-2xl" style={{ borderColor: 'var(--clr-border)' }}>
        <div className="bg-slate-100 dark:bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5"><CreditCard className="w-6 h-6 text-slate-700 dark:text-slate-300" aria-hidden="true" /></div>
        <h3 className="text-xl font-black mb-5" style={{ color: 'var(--clr-text-1)' }}>SIM ONLY<br /><span className="font-medium text-base opacity-60" style={{ color: 'var(--clr-text-3)' }}>מסלול קו בלבד</span></h3>
        <ul className="space-y-4 flex-grow">
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700 dark:text-slate-400 shrink-0 mt-1" aria-hidden="true" /><span className="font-medium text-sm" style={{ color: 'var(--clr-text-2)' }}>שירות קו בלבד ללא סים פיזי, ב-11.06 ₪ לחודש.</span></li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700 dark:text-slate-400 shrink-0 mt-1" aria-hidden="true" /><span className="font-medium text-sm" style={{ color: 'var(--clr-text-2)' }}>ללא התחייבות לתקופה.</span></li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700 dark:text-slate-400 shrink-0 mt-1" aria-hidden="true" /><span className="font-medium text-sm" style={{ color: 'var(--clr-text-2)' }}>אפשרות לשירות תיקונים מקיף למכשיר פרטי בתוספת 7.06 ₪.</span></li>
        </ul>
        <div className="mt-6 border rounded-xl p-4" style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' }}><span className="font-bold text-xs" style={{ color: 'var(--clr-text-2)' }}>מוקצה לעובדים הזכאים רק לחבילת סלולר ללא מכשיר.<br />סטודנטים ואזרחים ותיקים עודכנו למדרג מסד (88.50 ₪/חודש).</span></div>
      </div>

      <div className="lg:col-span-2 relative rounded-[2rem] bg-white/90 dark:bg-[#0B1120] p-6 sm:p-10 flex flex-col h-full shadow-xl dark:shadow-2xl border border-slate-200 dark:border-white/10 transition-colors duration-300">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-start mb-6 gap-4">
          <div className="bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"><Smartphone className="w-6 h-6 text-white" aria-hidden="true" /></div>
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-white/10 text-indigo-700 dark:text-white text-xs font-bold border border-indigo-200 dark:border-white/20">המסלול המומלץ והמקיף ביותר</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">תוכנית ליסינג מלאה (24 חודשים)</h3>
        <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 text-sm">המסלול מכיל מעטפת שירותים לכל תקופת ההתקשרות (פלאפון 60% / פרטנר 40%):</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 flex-grow">
          <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 shrink-0 mt-0.5"><Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /></div><span className="text-slate-800 dark:text-slate-200 text-sm">7,500 דקות + 7,500 הודעות SMS</span></li>
          <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 shrink-0 mt-0.5"><Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /></div><span className="text-slate-800 dark:text-slate-200 text-sm">נפח גלישה עצום בארץ: <strong>1 טרה-בייט (1TB)</strong></span></li>
          <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 shrink-0 mt-0.5"><Plug className="w-4 h-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" /></div><span className="text-slate-800 dark:text-slate-200 text-sm">המכשיר מסופק עם <strong>מטען קיר מתנה</strong></span></li>
          <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-cyan-100 dark:bg-cyan-500/20 shrink-0 mt-0.5"><Globe2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" /></div><span className="text-slate-800 dark:text-slate-200 text-sm">חבילת חו&quot;ל מובנית: 10GB בחודש + 50 דק&apos;/הודעות</span></li>
          <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-500/20 shrink-0 mt-0.5"><Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" /></div><span className="text-slate-800 dark:text-slate-200 text-sm">שירות תיקונים מקיף לכל 24 החודשים</span></li>
          <li className="flex items-start gap-3 sm:col-span-2 mt-2"><div className="p-1.5 rounded-full bg-pink-100 dark:bg-pink-500/20 shrink-0 mt-0.5"><ShieldAlert className="w-4 h-4 text-pink-600 dark:text-pink-400" aria-hidden="true" /></div><span className="text-slate-900 dark:text-white font-bold text-sm">חובה: צימוד סים (SIM Pairing) טכנולוגי - הקו מופעל רק 5 ימים ממועד האספקה כדי לאפשר העברת נתונים.</span></li>
        </ul>
      </div>
    </section>

    {/* NEW SECTION: Special Plans and Add-ons */}
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="premium-glass rounded-[1.5rem] border p-6 flex flex-col transition-shadow duration-300 hover:shadow-2xl hover-lift" style={{ borderColor: 'var(--clr-border)' }}>
        <h4 className="font-black text-lg mb-3 flex items-center gap-2"><Phone className="w-5 h-5 text-indigo-500" aria-hidden="true" /> ליסינג כשר</h4>
        <p className="text-sm font-medium mb-3 opacity-80 flex-grow">מכשיר לחצנים מאושר ועדת רבנים (ללא גלישה כלל).</p>
        <div className="mt-auto font-black text-indigo-600 dark:text-indigo-400 text-lg">26.20 ₪ <span className="text-xs font-medium">/ חודש</span></div>
      </div>
      <div className="premium-glass rounded-[1.5rem] border p-6 flex flex-col transition-shadow duration-300 hover:shadow-2xl hover-lift" style={{ borderColor: 'var(--clr-border)' }}>
        <h4 className="font-black text-lg mb-3 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-emerald-500" aria-hidden="true" /> שירות מוגן "נתיב"</h4>
        <p className="text-sm font-medium mb-3 opacity-80 flex-grow">אינטרנט מסונן למכשירים חכמים. דורש התחייבות ל-24 חודשים.</p>
        <div className="mt-auto font-black text-emerald-600 dark:text-emerald-400 text-lg">+ 35.30 ₪ <span className="text-xs font-medium">/ חודש (מעבר למכשיר)</span></div>
      </div>
      <div className="premium-glass rounded-[1.5rem] border p-6 flex flex-col transition-shadow duration-300 hover:shadow-2xl hover-lift" style={{ borderColor: 'var(--clr-border)' }}>
        <h4 className="font-black text-lg mb-3 flex items-center gap-2"><Watch className="w-5 h-5 text-cyan-500" aria-hidden="true" /> תוספות לקו</h4>
        <ul className="text-sm font-medium opacity-80 space-y-2 mt-auto">
          <li>• קו לשעון חכם / רכב: <strong className="text-cyan-600 dark:text-cyan-400">8.1 ₪/חודש</strong></li>
          <li>• קו גיבוי (חברה שניה): <strong className="text-cyan-600 dark:text-cyan-400">85.2 ₪/שנה</strong></li>
          <li>• ניתן להוסיף אוזניות מיתרת הזכאות.</li>
        </ul>
      </div>
    </section>

    <section className="relative rounded-[2rem] overflow-hidden shadow-xl border p-6 sm:p-10 transition-shadow duration-300 hover:shadow-2xl" style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}>
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: 'var(--clr-text-1)' }}><div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-xl"><ShieldAlert className="w-6 h-6 text-red-500" aria-hidden="true" /></div>הנחיות חובה לפני המעבר</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex gap-4"><div className="bg-slate-50 dark:bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" /></div><div><h4 className="font-black text-lg" style={{ color: 'var(--clr-text-1)' }}>14 יום להחזרת ציוד ישן</h4><p className="text-sm opacity-80" style={{ color: 'var(--clr-text-2)' }}>יש להחזיר את מכשיר הליסינג הישן לפלאפון תוך 14 ימי עסקים. איחור יגרור חיוב מלא בשווי המכשיר!</p></div></div>
        <div className="flex gap-4"><div className="bg-slate-50 dark:bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0"><Database className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" /></div><div><h4 className="font-black text-lg" style={{ color: 'var(--clr-text-1)' }}>אחריות גיבוי נתונים</h4><p className="text-sm opacity-80" style={{ color: 'var(--clr-text-2)' }}>חובה עליכם לגבות עצמאית את התמונות, אנשי הקשר וה-WhatsApp לענן טרם שדרוג המכשיר. אין אחריות לחברה.</p></div></div>
        <div className="flex gap-4"><div className="bg-slate-50 dark:bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0"><PackageX className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" /></div><div><h4 className="font-black text-lg" style={{ color: 'var(--clr-text-1)' }}>ביטול עסקה (חרטה)</h4><p className="text-sm opacity-80" style={{ color: 'var(--clr-text-2)' }}>אפשרי תוך 14 ימי עסקים מהאספקה, אך ורק אם <strong className="text-slate-900 dark:text-white">האריזה המקורית לא נפתחה כלל</strong>. פתיחת אריזה מבטלת זכות זו.</p></div></div>
        <div className="flex gap-4"><div className="bg-slate-50 dark:bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0"><Truck className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" /></div><div><h4 className="font-black text-lg" style={{ color: 'var(--clr-text-1)' }}>דמי משלוח וביטול שליחות</h4><p className="text-sm opacity-80" style={{ color: 'var(--clr-text-2)' }}>משלוח לעובדי דרג תיכון ומטה: 50.42 ₪. ביטול שליחות דורש התראה של 2 ימי עסקים. אי ביטול בזמן יגרור חיוב מלא.</p></div></div>
        <div className="flex gap-4 md:col-span-2"><div className="bg-slate-50 dark:bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0"><UserPlus className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" /></div><div><h4 className="font-black text-lg" style={{ color: 'var(--clr-text-1)' }}>מעבר מחברת פלאפון (מכרז קודם) לפרטנר</h4><p className="text-sm opacity-80" style={{ color: 'var(--clr-text-2)' }}>בעלי קו פלאפון מהמכרז הישן העוברים לפרטנר מחוייבים להציג אסמכתא שביטלו/העבירו בעלות לקו הישן. ללא הצגת אסמכתא תוך 24 שעות מהאספקה - המשרד ינתק אוטומטית את הקו הישן.</p></div></div>
      </div>
    </section>

    <section className="relative rounded-[2rem] overflow-hidden shadow-xl bg-slate-50 dark:bg-[#0B1120] border border-cyan-200 dark:border-cyan-900/30 p-6 sm:p-10 transition-all duration-300 hover:shadow-2xl hover-lift">
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-bold text-xs mb-5 border border-cyan-200 dark:border-cyan-500/20"><Globe2 className="w-3.5 h-3.5" aria-hidden="true" /> מידע למשתמש בחו"ל</div>
      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">חבילות הגלישה בחשבון האישי (Roaming)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm dark:shadow-none">
          <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 w-fit mb-3"><Ban className="w-5 h-5 text-cyan-600 dark:text-cyan-400" aria-hidden="true" /></div>
          <h4 className="font-black text-slate-900 dark:text-white text-sm mb-2">חסימה אוטומטית למניעת חריגות</h4>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">לאחר סיום נפח הגלישה המובנה (10GB), הגלישה תחסם לחלוטין. מנויים יקבלו התראה ב-75% וב-100% לניצול.</p>
        </div>
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm dark:shadow-none">
          <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 w-fit mb-3"><Globe2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" /></div>
          <h4 className="font-black text-slate-900 dark:text-white text-sm mb-2">הרחבת חבילות באשראי אישי</h4>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">ניתן לרכוש עצמאית חבילות נוספות (כגון 5GB ב-5 ₪ או 20GB ב-13 ₪) ללא הגבלת ימי תוקף לחבילה.</p>
        </div>
      </div>
    </section>

    {/* NEW SECTION: דגשים פיננסיים */}
    <section className="relative rounded-[2rem] overflow-hidden shadow-xl border p-6 sm:p-10 transition-shadow duration-300 hover:shadow-2xl" style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' }}>
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: 'var(--clr-text-1)' }}><div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-xl"><CreditCard className="w-6 h-6 text-amber-500" aria-hidden="true" /></div>דגשים פיננסיים ותעריפי חריגה</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex gap-4"><div className="bg-white dark:bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10"><CreditCard className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" /></div><div><h4 className="font-black text-lg" style={{ color: 'var(--clr-text-1)' }}>חריגות בארץ - חיוב באשראי אישי</h4><div className="text-sm opacity-80 mt-1" style={{ color: 'var(--clr-text-2)' }}><p className="mb-1">כל חריגה מהמכסה החודשית בארץ תגרור חיוב ישיר מכרטיס האשראי האישי:</p><ul className="space-y-0.5"><li>&bull; גלישה: <strong className="text-slate-900 dark:text-white">0.85 ₪</strong> לכל GB חריגה</li><li>&bull; שיחות: <strong className="text-slate-900 dark:text-white">4.2 אגורות</strong> לכל דקה</li><li>&bull; SMS/MMS: <strong className="text-slate-900 dark:text-white">0.85 אגורה</strong> לכל הודעה</li></ul></div></div></div>
        <div className="flex gap-4"><div className="bg-white dark:bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10"><Phone className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" /></div><div><h4 className="font-black text-lg" style={{ color: 'var(--clr-text-1)' }}>שיחות לחו"ל מהארץ</h4><p className="text-sm opacity-80" style={{ color: 'var(--clr-text-2)' }}>חיוג לחו"ל במסגרת המכסה יתבצע אך ורק בקידומת <strong className="text-slate-900 dark:text-white">014</strong> של בזק בינלאומי. חיוג בקידומת אחרת יגרור חיובים כבדים!</p></div></div>
      </div>
    </section>

  </div>
);

export default GuideScreen;
