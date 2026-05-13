import {
  Sparkles, Globe2, Phone, Plug, Wrench, ShieldAlert,
  AlertCircle, CreditCard, Smartphone, CheckCircle2, Clock, Database
} from 'lucide-react';

const GuideScreen = () => (
  <div className="space-y-8 animate-in fade-in duration-700 relative z-10 max-w-6xl mx-auto" style={{ color: 'var(--clr-text-1)' }}>
    <div className="text-center max-w-3xl mx-auto mb-10 pt-4">
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-[#4F46E5] dark:text-indigo-300 font-bold text-xs mb-4 border border-indigo-100 dark:border-indigo-800"><Sparkles className="w-3.5 h-3.5" /> הדרכה רשמית</div>
      <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight" style={{ color: 'var(--clr-text-1)' }}>המדריך למכרז <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">2026</span></h2>
      <p className="text-base font-medium opacity-80" style={{ color: 'var(--clr-text-2)' }}>ריכזנו עבורך את כל המידע הקריטי מתוך תקציר השירותים הממשלתי. השוואת מסלולים, חוקי ברזל לשימוש והנחיות התקשרות.</p>
    </div>

    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-1 premium-glass rounded-[2rem] border p-6 flex flex-col transition-shadow duration-300 hover:shadow-2xl" style={{ borderColor: 'var(--clr-border)' }}>
        <div className="bg-slate-100 dark:bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5"><CreditCard className="w-6 h-6 text-slate-700 dark:text-slate-300" /></div>
        <h3 className="text-xl font-black mb-5" style={{ color: 'var(--clr-text-1)' }}>SIM ONLY<br /><span className="font-medium text-base opacity-60" style={{ color: 'var(--clr-text-3)' }}>מסלול קו בלבד</span></h3>
        <ul className="space-y-4 flex-grow">
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700 dark:text-slate-400 shrink-0 mt-1" /><span className="font-medium text-sm" style={{ color: 'var(--clr-text-2)' }}>שירות קו בלבד ללא סים פיזי, ב-11.06 ₪.</span></li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700 dark:text-slate-400 shrink-0 mt-1" /><span className="font-medium text-sm" style={{ color: 'var(--clr-text-2)' }}>ללא התחייבות לתקופה.</span></li>
          <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700 dark:text-slate-400 shrink-0 mt-1" /><span className="font-medium text-sm" style={{ color: 'var(--clr-text-2)' }}>שירות תיקונים מקיף אופציונלי בתוספת 7.06 ₪.</span></li>
        </ul>
        <div className="mt-6 border rounded-xl p-4" style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' }}><span className="font-bold text-xs" style={{ color: 'var(--clr-text-2)' }}>מוקצה לעובדים הזכאים רק לחבילת סלולר ללא מכשיר, בהתאם לשיקול דעת המשרד.<br />סטודנטים ואזרחים ותיקים עודכנו למדרג מסד (88.50 ₪/חודש).</span></div>
      </div>

      <div className="lg:col-span-2 relative rounded-[2rem] bg-[#0B1120] p-6 sm:p-10 flex flex-col h-full shadow-2xl border border-white/10">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-start mb-6 gap-4">
          <div className="bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"><Smartphone className="w-6 h-6 text-white" /></div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">המסלול המומלץ והמקיף ביותר</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">תוכנית ליסינג מלאה (24 חודשים)</h3>
        <p className="text-slate-400 font-medium mb-6 text-sm">המסלול מכיל מעטפת שירותים אבסולוטית לכל תקופת ההתקשרות:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 flex-grow">
          <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-emerald-500/20 shrink-0 mt-0.5"><Phone className="w-4 h-4 text-emerald-400" /></div><span className="text-slate-200 text-sm">7,500 דקות + 7,500 הודעות SMS</span></li>
          <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-emerald-500/20 shrink-0 mt-0.5"><Globe2 className="w-4 h-4 text-emerald-400" /></div><span className="text-slate-200 text-sm">נפח גלישה עצום בארץ: <strong>1 טרה-בייט (1TB)</strong></span></li>
          <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-indigo-500/20 shrink-0 mt-0.5"><Plug className="w-4 h-4 text-indigo-400" /></div><span className="text-slate-200 text-sm">המכשיר מסופק עם <strong>מטען קיר מתנה</strong></span></li>
          <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-cyan-500/20 shrink-0 mt-0.5"><Globe2 className="w-4 h-4 text-cyan-400" /></div><span className="text-slate-200 text-sm">חבילת חו&quot;ל מובנית (10GB + 50 דק&apos;)</span></li>
          <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-blue-500/20 shrink-0 mt-0.5"><Wrench className="w-4 h-4 text-blue-400" /></div><span className="text-slate-200 text-sm">שירות תיקונים מקיף לכל 24 החודשים</span></li>
          <li className="flex items-start gap-3 sm:col-span-2 mt-2"><div className="p-1.5 rounded-full bg-pink-500/20 shrink-0 mt-0.5"><ShieldAlert className="w-4 h-4 text-pink-400" /></div><span className="text-white font-bold text-sm">חובה: מופעל צימוד סים (SIM Pairing) טכנולוגי - קו נעול למכשיר.</span></li>
        </div>
      </div>
    </section>

    <section className="relative rounded-[2rem] overflow-hidden shadow-xl border p-6 sm:p-10" style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}>
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: 'var(--clr-text-1)' }}><div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-xl"><ShieldAlert className="w-6 h-6 text-red-500" /></div>הנחיות חובה לפני המעבר</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex gap-4"><div className="bg-slate-50 dark:bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" /></div><div><h4 className="font-black text-lg" style={{ color: 'var(--clr-text-1)' }}>14 יום להחזרת ציוד ישן</h4><p className="text-sm opacity-80" style={{ color: 'var(--clr-text-2)' }}>יש לכם בדיוק 14 ימי עסקים להחזיר את מכשיר הליסינג הישן לפלאפון. איחור יגרור קנס וחיוב מלא בשווי המכשיר!</p></div></div>
        <div className="flex gap-4"><div className="bg-slate-50 dark:bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0"><Database className="w-5 h-5 text-slate-600 dark:text-slate-400" /></div><div><h4 className="font-black text-lg" style={{ color: 'var(--clr-text-1)' }}>אחריות גיבוי נתונים</h4><p className="text-sm opacity-80" style={{ color: 'var(--clr-text-2)' }}>חובה עליכם לגבות עצמאית את כל התמונות, אנשי הקשר וה-WhatsApp לענן טרם שדרוג המכשיר והחזרתו.</p></div></div>
      </div>
    </section>

    <section className="relative rounded-[2rem] overflow-hidden shadow-xl bg-[#0B1120] border border-cyan-900/30 p-6 sm:p-10">
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold text-xs mb-5 border border-cyan-500/20"><Globe2 className="w-3.5 h-3.5" /> עדכון גרסה 1.5 — שירותי חו&quot;ל</div>
      <h3 className="text-2xl font-black text-white mb-6">חבילות Roaming — ארכיטקטורה חדשה</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 w-fit mb-3"><Globe2 className="w-5 h-5 text-cyan-400" /></div>
          <h4 className="font-black text-white text-sm mb-2">חבילות גלישה גמישות</h4>
          <p className="text-slate-400 text-xs leading-relaxed">חבילות גלישה בסיסיות: 5GB ב-5 ₪, 20GB ב-13 ₪. ללא הגבלת ימי תוקף.</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 w-fit mb-3"><CheckCircle2 className="w-5 h-5 text-emerald-400" /></div>
          <h4 className="font-black text-white text-sm mb-2">Zero-Rating באפליקציות שירות</h4>
          <p className="text-slate-400 text-xs leading-relaxed">WhatsApp, Facebook, Instagram, Waze, Google Maps — הגלישה <strong className="text-white">אינה יורדת</strong> מנפח החבילה.</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
          <div className="p-2.5 rounded-xl bg-red-500/20 w-fit mb-3"><ShieldAlert className="w-5 h-5 text-red-400" /></div>
          <h4 className="font-black text-white text-sm mb-2">חסימה אוטומטית (Hard Stop)</h4>
          <p className="text-slate-400 text-xs leading-relaxed">בסיום נפח גלישת חו&quot;ל — הגלישה נחסמת אוטומטית. לא תצברו חיובים נסתרים.</p>
        </div>
      </div>
    </section>


  </div>
);

export default GuideScreen;
