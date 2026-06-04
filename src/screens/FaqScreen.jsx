import { HelpCircle, BookOpen, Info, Sparkles } from 'lucide-react';
import AccordionItem from '../components/AccordionItem';

const FaqScreen = ({ faq = [] }) => {
  const qaItems      = faq.filter(item => !item.type || item.type === 'qa');
  const regulations  = faq.filter(item => item.type === 'regulation');

  return (
    <div className="animate-in fade-in max-w-3xl mx-auto relative z-10" style={{ color: 'var(--clr-text-1)' }}>
      {/* ── כותרת ── */}
      <div className="text-center mb-10 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-[#4F46E5] dark:text-indigo-300 font-bold text-xs mb-4 border border-indigo-100 dark:border-indigo-800">
          <HelpCircle className="w-3.5 h-3.5" /> מכרז 01-2024
        </div>
        <h2 className="text-4xl font-black mb-3" style={{ color: 'var(--clr-text-1)' }}>
          שאלות{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">
            ותשובות
          </span>
        </h2>
        <p className="text-sm font-medium max-w-xl mx-auto opacity-80" style={{ color: 'var(--clr-text-2)' }}>
          תשובות לשאלות הנפוצות ביותר על מכרז הסלולר הממשלתי 01-2024.
          לפרטים המחייבים — עיינו בהוראות התכ&quot;ם הרשמיות.
        </p>
      </div>

      {/* ── שאלות ותשובות ── */}
      {qaItems.length > 0 && (
        <section className="space-y-4 mb-8" aria-label="שאלות ותשובות">
          {qaItems.map((item, idx) => (
            <AccordionItem key={idx} question={item.question} answer={item.answer} />
          ))}
        </section>
      )}

      {/* ── קישור לאתר החשכ"ל ── */}
      <div
        className="border rounded-[1.5rem] p-5 flex items-start gap-3 mb-6"
        style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' }}
      >
        <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div>
          <div className="font-black text-indigo-700 dark:text-indigo-300 text-sm mb-1">קישור ישיר לאתר החשכ&quot;ל</div>
          <a
            href="https://takam.mof.gov.il/document/HM.16.7.1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 font-bold text-sm underline hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
          >
            לחץ כאן לכלל הוראות תכ&quot;ם 16.7.1 ←
          </a>
        </div>
      </div>

      {/* ── הפניות רגולטוריות (אם קיימות) ── */}
      {regulations.length > 0 && (
        <section aria-label="הוראות תכ&quot;ם">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <h3 className="text-sm font-black uppercase tracking-wider" style={{ color: 'var(--clr-text-3)' }}>
              הוראות תכ&quot;ם — מקור האמת הרגולטורי
            </h3>
          </div>
          <div className="space-y-3">
            {regulations.map((item, idx) => (
              <AccordionItem key={idx} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>
      )}

      {/* ── footer ── */}
      <div className="mt-6 flex items-center justify-center gap-2 opacity-60 text-xs" style={{ color: 'var(--clr-text-3)' }}>
        <Sparkles className="w-3.5 h-3.5" />
        <span>הנתונים מתעדכנים בזמן אמת מגיליון הממשל</span>
      </div>
    </div>
  );
};

export default FaqScreen;
