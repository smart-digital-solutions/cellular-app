import {
  AlertTriangle, Info, ShieldAlert, CreditCard, Phone, Wrench,
  Truck, RotateCcw, Receipt, PhoneCall, ShieldCheck, SearchCheck,
  PackageX, Sparkles
} from 'lucide-react';

// ─── מיפוי שמות אייקונים מ-Google Sheets → קומפוננטות ───
const ICON_MAP = {
  AlertTriangle, Info, ShieldAlert, CreditCard, Phone, Wrench,
  Truck, RotateCcw, Receipt, PhoneCall, ShieldCheck, SearchCheck, PackageX,
};

const SEVERITY_CONFIG = {
  danger: {
    card: 'bg-red-500/8 dark:bg-red-900/15 border-red-200 dark:border-red-800/50',
    icon: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    title: 'text-red-800 dark:text-red-300',
    badge: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    bar: 'from-red-500 to-red-400',
    badgeLabel: 'חשוב במיוחד',
  },
  warning: {
    card: 'bg-amber-500/8 dark:bg-amber-900/15 border-amber-200 dark:border-amber-800/50',
    icon: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    title: 'text-amber-800 dark:text-amber-300',
    badge: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    bar: 'from-amber-400 to-amber-300',
    badgeLabel: 'שים לב',
  },
  info: {
    card: 'bg-indigo-500/5 dark:bg-indigo-900/15 border-indigo-200 dark:border-indigo-800/50',
    icon: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    title: 'text-indigo-800 dark:text-indigo-300',
    badge: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800',
    bar: 'from-indigo-500 to-cyan-400',
    badgeLabel: 'לידיעתך',
  },
};

// ─── כרטיס דגש בודד ───
function NoteCard({ note }) {
  const IconCmp = ICON_MAP[note.icon] || Info;
  const cfg = SEVERITY_CONFIG[note.severity] || SEVERITY_CONFIG.info;

  // תמיכה בשורות חדשות בתוכן (תו \n)
  const contentLines = String(note.content || '').split('\n');

  return (
    <article
      className={`relative rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${cfg.card}`}
      id={`note-${note.id}`}
    >
      {/* פס צד */}
      <div className={`absolute top-0 right-0 w-1.5 h-full rounded-r-2xl bg-gradient-to-b ${cfg.bar}`} aria-hidden="true" />

      <div className="flex items-start gap-4 pe-2">
        {/* אייקון */}
        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${cfg.icon}`} aria-hidden="true">
          <IconCmp className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className={`font-black text-base leading-tight ${cfg.title}`}>{note.title}</h3>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${cfg.badge}`}>
              {cfg.badgeLabel}
            </span>
          </div>
          <div className="space-y-1">
            {contentLines.map((line, i) => (
              <p key={i} className="text-sm font-medium leading-relaxed" style={{ color: 'var(--clr-text-2)' }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── מסך ראשי ───
const ImportantNotesScreen = ({ importantNotes = [] }) => {
  const danger  = importantNotes.filter(n => n.severity === 'danger');
  const warning = importantNotes.filter(n => n.severity === 'warning');
  const info    = importantNotes.filter(n => n.severity === 'info');

  return (
    <div
      className="space-y-8 animate-in fade-in duration-700 max-w-4xl mx-auto relative z-10"
      style={{ color: 'var(--clr-text-1)' }}
    >
      {/* ── כותרת ── */}
      <div className="text-center pt-4 mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 font-bold text-xs mb-4 border border-amber-200 dark:border-amber-800">
          <AlertTriangle className="w-3.5 h-3.5" /> מידע קריטי לעובד
        </div>
        <h2 className="text-4xl font-black mb-3" style={{ color: 'var(--clr-text-1)' }}>
          דגשים{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500">
            חשובים
          </span>
        </h2>
        <p className="text-sm font-medium max-w-xl mx-auto opacity-80" style={{ color: 'var(--clr-text-2)' }}>
          מכרז 01-2024 | כל המידע הפיננסי והתפעולי הקריטי שחשוב שתכיר לפני שתבצע הזמנה.
        </p>
      </div>

      {/* ── בנר סיכום ── */}
      <div className="relative rounded-[2rem] bg-[#0B1120] border border-white/10 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-amber-500/10 to-red-500/5 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="bg-amber-500/20 p-3 rounded-2xl border border-amber-500/30 shrink-0">
            <ShieldAlert className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white mb-1">לפני שממשיכים — חשוב לקרוא</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              הדגשים הבאים נגזרים ממסמך המכרז הרשמי (01-2024). אי-עמידה בתנאים עלולה לגרור{' '}
              <strong className="text-amber-300">חיובים אוטומטיים</strong> מכרטיס האשראי האישי.
              יש לקרוא בעיון לפני ביצוע כל הזמנה.
            </p>
          </div>
        </div>
      </div>

      {/* ── כרטיסים לפי חומרה ── */}
      {danger.length > 0 && (
        <section aria-labelledby="danger-section">
          <h3
            id="danger-section"
            className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 mb-3 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            חשוב במיוחד — חיובים פיננסיים
          </h3>
          <div className="space-y-3">
            {danger.map(n => <NoteCard key={n.id} note={n} />)}
          </div>
        </section>
      )}

      {warning.length > 0 && (
        <section aria-labelledby="warning-section">
          <h3
            id="warning-section"
            className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            שים לב — נהלים ותנאים
          </h3>
          <div className="space-y-3">
            {warning.map(n => <NoteCard key={n.id} note={n} />)}
          </div>
        </section>
      )}

      {info.length > 0 && (
        <section aria-labelledby="info-section">
          <h3
            id="info-section"
            className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
            לידיעתך — שירותים וזכויות
          </h3>
          <div className="space-y-3">
            {info.map(n => <NoteCard key={n.id} note={n} />)}
          </div>
        </section>
      )}

      {/* ── footer ── */}
      <div className="flex items-center justify-center gap-2 opacity-50 text-xs pt-2" style={{ color: 'var(--clr-text-3)' }}>
        <Sparkles className="w-3.5 h-3.5" />
        <span>הנתונים מתעדכנים בזמן אמת מגיליון הממשל | מכרז 01-2024</span>
      </div>
    </div>
  );
};

export default ImportantNotesScreen;
