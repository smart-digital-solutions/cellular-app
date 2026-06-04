import { AlertTriangle, CreditCard, Receipt, Globe, ShieldAlert, PhoneCall, CheckCircle, Info } from 'lucide-react';

// Icon Map for dynamic rendering from sheets
const ICON_MAP = {
  'credit-card': CreditCard,
  'receipt': Receipt,
  'globe': Globe,
  'shield-alert': ShieldAlert,
  'phone-call': PhoneCall,
  'check-circle': CheckCircle,
  'info': Info,
  'alert-triangle': AlertTriangle
};

const SEVERITY_THEMES = {
  danger: {
    wrapper: 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30',
    iconBg: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500',
    title: 'text-red-700 dark:text-red-400',
    text: 'text-slate-700 dark:text-slate-300'
  },
  warning: {
    wrapper: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30',
    iconBg: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-500',
    title: 'text-amber-700 dark:text-amber-400',
    text: 'text-slate-700 dark:text-slate-300'
  },
  info: {
    wrapper: 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30',
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
    title: 'text-indigo-700 dark:text-indigo-300',
    text: 'text-slate-700 dark:text-slate-300'
  }
};

const ImportantNotesScreen = ({ importantNotes = [] }) => {
  // Sort by order
  const sortedNotes = [...importantNotes].sort((a, b) => (a.order || 99) - (b.order || 99));

  return (
    <div className="animate-in fade-in max-w-4xl mx-auto z-10 relative">
      <div className="text-center mb-10 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-bold text-xs mb-4 border border-amber-200 dark:border-amber-800/50">
          <AlertTriangle className="w-3.5 h-3.5" /> דגשים ונהלי חובה
        </div>
        <h2 className="text-4xl font-black mb-3 text-slate-800 dark:text-white">
          דגשים <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">חשובים</span>
        </h2>
        <p className="text-sm font-medium max-w-xl mx-auto text-slate-600 dark:text-slate-400">
          מידע קריטי על חיובי אשראי אישיים, תעריפי חריגות ונהלי חובה במכרז. יש לקרוא בקפידה טרם ביצוע הזמנה.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 relative">
        {sortedNotes.map((note) => {
          const Icon = ICON_MAP[note.icon] || AlertTriangle;
          const theme = SEVERITY_THEMES[note.severity] || SEVERITY_THEMES.info;

          return (
            <div 
              key={note.id} 
              className={`rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${theme.wrapper} bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm`}
            >
              <div className="flex items-start gap-4">
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${theme.iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-black mb-2 ${theme.title}`}>{note.title}</h3>
                  <p className={`text-sm leading-relaxed ${theme.text}`}>
                    {note.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {sortedNotes.length === 0 && (
          <div className="col-span-full text-center py-10 opacity-50 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-20 text-slate-800 dark:text-white" />
            <p className="font-bold text-slate-800 dark:text-white">אין דגשים חשובים כרגע</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportantNotesScreen;
