import { Megaphone, Info, Sparkles } from 'lucide-react';
import AccordionItem from '../components/AccordionItem';

const FaqScreen = ({ faq }) => (
  <div className="animate-in fade-in max-w-3xl mx-auto relative z-10" style={{ color: 'var(--clr-text-1)' }}>
    <div className="text-center mb-10 pt-4">

      <h2 className="text-4xl font-black mb-3" style={{ color: 'var(--clr-text-1)' }}>
        הודעות <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">התכ&quot;ם</span>
      </h2>
      <p className="text-sm font-medium max-w-xl mx-auto opacity-80" style={{ color: 'var(--clr-text-2)' }}>
        הוראות תכ&quot;ם הן מקור האמת הרגולטורי הרשמי. לכל שאלה פרטנית — יש לעיין בהוראה הרלוונטית באתר החשכ&quot;ל.
      </p>
    </div>
    <div className="space-y-4">
      {faq.map((item, idx) => (
        <AccordionItem key={idx} question={item.question} answer={item.answer} />
      ))}
    </div>
    <div className="mt-8 border rounded-[1.5rem] p-5 flex items-start gap-3" style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' }}>
      <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <div className="font-black text-indigo-700 dark:text-indigo-300 text-sm mb-1">קישור ישיר לאתר החשכ&quot;ל</div>
        <a
          href="https://takam.mof.gov.il/document/HM.16.7.1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 font-bold text-sm underline hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
        >
          לחץ כאן לכלל הוראות תכ&quot;ם 16.7.1 →
        </a>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-center gap-2 opacity-60 text-xs" style={{ color: 'var(--clr-text-3)' }}>
      <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
      <span>הנתונים מתעדכנים בזמן אמת מגיליון הממשל</span>
    </div>
  </div>
);

export default FaqScreen;
