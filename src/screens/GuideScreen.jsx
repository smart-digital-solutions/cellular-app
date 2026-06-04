import {
  Sparkles, Globe2, Phone, Plug, Wrench, ShieldAlert, ShieldCheck,
  CreditCard, Smartphone, CheckCircle2, Clock, Database, Truck,
  RotateCcw, Link2, Shuffle, Watch, Shield, PhoneCall, Info,
} from 'lucide-react';

// ─── מיפוי שמות אייקונים מ-Google Sheets → קומפוננטות ───
const ICON_MAP = {
  Globe2, Phone, Plug, Wrench, ShieldAlert, ShieldCheck, CreditCard,
  Smartphone, CheckCircle2, Clock, Database, Truck, RotateCcw, Link2,
  Shuffle, Watch, Shield, PhoneCall, Info,
};

// ─── הגדרות סגנון לפי style field ───
const STYLE_CONFIG = {
  light: {
    wrapper: 'premium-glass border',
    wrapperStyle: { borderColor: 'var(--clr-border)', backgroundColor: 'var(--clr-surface)' },
    iconWrapper: 'bg-slate-100 dark:bg-white/10',
    iconColor: 'text-slate-700 dark:text-slate-300',
    title: '',
    titleStyle: { color: 'var(--clr-text-1)' },
    itemColor: '',
    itemStyle: { color: 'var(--clr-text-2)' },
    checkColor: 'text-slate-600 dark:text-slate-400',
    footerStyle: { backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' },
  },
  dark: {
    wrapper: 'bg-[#0B1120] border border-white/10 shadow-2xl',
    wrapperStyle: {},
    iconWrapper: 'bg-gradient-to-br from-[#4F46E5] to-[#06B6D4]',
    iconColor: 'text-white',
    title: 'text-white',
    titleStyle: {},
    itemColor: 'text-slate-200',
    itemStyle: {},
    checkColor: 'text-emerald-400',
    footerStyle: { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' },
  },
  warning: {
    wrapper: 'border bg-amber-50/50 dark:bg-amber-900/10',
    wrapperStyle: { borderColor: 'rgba(251,191,36,0.3)' },
    iconWrapper: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    title: 'text-amber-800 dark:text-amber-200',
    titleStyle: {},
    itemColor: '',
    itemStyle: { color: 'var(--clr-text-2)' },
    checkColor: 'text-amber-500',
    footerStyle: { backgroundColor: 'rgba(251,191,36,0.07)', borderColor: 'rgba(251,191,36,0.2)' },
  },
  cyan: {
    wrapper: 'bg-white/5 border border-white/10',
    wrapperStyle: {},
    iconWrapper: 'bg-cyan-500/20',
    iconColor: 'text-cyan-400',
    title: 'text-white',
    titleStyle: {},
    itemColor: 'text-slate-400',
    itemStyle: {},
    checkColor: 'text-cyan-400',
    footerStyle: { backgroundColor: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.2)' },
  },
  danger: {
    wrapper: 'bg-red-500/10 border border-red-500/20',
    wrapperStyle: {},
    iconWrapper: 'bg-red-500/20',
    iconColor: 'text-red-400',
    title: 'text-white',
    titleStyle: {},
    itemColor: 'text-slate-400',
    itemStyle: {},
    checkColor: 'text-red-400',
    footerStyle: { backgroundColor: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)' },
  },
};

// ─── כרטיס מסלול / הנחיה ───
function GuideCard({ card }) {
  const IconCmp = ICON_MAP[card.icon] || Info;
  const cfg = STYLE_CONFIG[card.style] || STYLE_CONFIG.light;
  const isDark = card.style === 'dark' || card.style === 'cyan' || card.style === 'danger';

  return (
    <div
      className={`relative rounded-[2rem] p-6 flex flex-col transition-shadow duration-300 hover:shadow-2xl ${cfg.wrapper}`}
      style={cfg.wrapperStyle}
    >
      {/* Badge */}
      {card.badge && (
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
          {card.badge}
        </span>
      )}

      {/* אייקון */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg ${cfg.iconWrapper}`} aria-hidden="true">
        <IconCmp className={`w-6 h-6 ${cfg.iconColor}`} />
      </div>

      {/* כותרת */}
      <h3 className={`text-xl font-black mb-1 ${cfg.title}`} style={cfg.titleStyle}>
        {card.title}
        {card.subtitle && (
          <><br /><span className={`font-medium text-base opacity-60 ${isDark ? 'text-slate-300' : ''}`} style={isDark ? {} : { color: 'var(--clr-text-3)' }}>{card.subtitle}</span></>
        )}
      </h3>

      {/* רשימת פריטים */}
      {card.items?.length > 0 && (
        <ul className="space-y-3 flex-grow mt-4">
          {card.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${cfg.checkColor}`} aria-hidden="true" />
              <span className={`font-medium text-sm ${cfg.itemColor}`} style={cfg.itemStyle}>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* הערת שוליים */}
      {card.footer && (
        <div className="mt-5 border rounded-xl p-3" style={cfg.footerStyle}>
          <span className={`font-bold text-xs ${isDark ? 'text-slate-300' : ''}`} style={isDark ? {} : { color: 'var(--clr-text-2)' }}>
            {card.footer}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Section: תוכניות (plans) — layout שמאל גדול + ימין קטן ───
function PlansSection({ cards }) {
  const featured = cards.find(c => c.badge) || cards[0];
  const rest = cards.filter(c => c !== featured);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* כרטיסים קטנים (סטאק) */}
      {rest.length > 0 && (
        <div className="lg:col-span-1 space-y-5">
          {rest.map(c => <GuideCard key={c.id} card={c} />)}
        </div>
      )}
      {/* כרטיס ראשי מורחב */}
      {featured && (
        <div className={rest.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <GuideCard card={featured} />
        </div>
      )}
    </section>
  );
}

// ─── Section: הנחיות (instructions) — grid 2 עמודות ───
function InstructionsSection({ cards }) {
  return (
    <section
      className="relative rounded-[2rem] overflow-hidden shadow-xl border p-6 sm:p-10"
      style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}
    >
      <h3 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: 'var(--clr-text-1)' }}>
        <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-xl"><ShieldAlert className="w-6 h-6 text-red-500" /></div>
        הנחיות חובה לפני המעבר
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cards.map(card => {
          const IconCmp = ICON_MAP[card.icon] || Info;
          return (
            <div key={card.id} className="flex gap-4">
              <div className="bg-slate-50 dark:bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0" aria-hidden="true">
                <IconCmp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h4 className="font-black text-lg" style={{ color: 'var(--clr-text-1)' }}>{card.title}</h4>
                {card.items?.map((item, i) => (
                  <p key={i} className="text-sm opacity-80 mt-0.5" style={{ color: 'var(--clr-text-2)' }}>{item}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Section: Roaming (roaming) — grid 3 עמודות ───
function RoamingSection({ cards }) {
  return (
    <section className="relative rounded-[2rem] overflow-hidden shadow-xl bg-[#0B1120] border border-cyan-900/30 p-6 sm:p-10">
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold text-xs mb-5 border border-cyan-500/20">
        <Globe2 className="w-3.5 h-3.5" /> שירותי חו&quot;ל — מכרז 01-2024
      </div>
      <h3 className="text-2xl font-black text-white mb-6">חבילות Roaming ושיחות בינלאומיות</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(card => <GuideCard key={card.id} card={card} />)}
      </div>
    </section>
  );
}

// ─── המסך הראשי ───
const GuideScreen = ({ guide = [] }) => {
  const plans       = guide.filter(c => c.section === 'plans').sort((a, b) => a.order - b.order);
  const instructions= guide.filter(c => c.section === 'instructions').sort((a, b) => a.order - b.order);
  const roaming     = guide.filter(c => c.section === 'roaming').sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative z-10 max-w-6xl mx-auto" style={{ color: 'var(--clr-text-1)' }}>
      {/* ── כותרת ── */}
      <div className="text-center max-w-3xl mx-auto mb-10 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-[#4F46E5] dark:text-indigo-300 font-bold text-xs mb-4 border border-indigo-100 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5" /> הדרכה רשמית
        </div>
        <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight" style={{ color: 'var(--clr-text-1)' }}>
          המדריך למכרז{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">01-2024</span>
        </h2>
        <p className="text-base font-medium opacity-80" style={{ color: 'var(--clr-text-2)' }}>
          ריכזנו עבורך את כל המידע הקריטי מתוך תקציר השירותים הממשלתי.
          השוואת מסלולים, הנחיות חובה לפני המעבר ואפשרויות הרחבה.
        </p>
      </div>

      {/* ── מסלולים ── */}
      {plans.length > 0 && <PlansSection cards={plans} />}

      {/* ── הנחיות ── */}
      {instructions.length > 0 && <InstructionsSection cards={instructions} />}

      {/* ── חו"ל ── */}
      {roaming.length > 0 && <RoamingSection cards={roaming} />}

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 opacity-50 text-xs pt-2" style={{ color: 'var(--clr-text-3)' }}>
        <Sparkles className="w-3.5 h-3.5" />
        <span>הנתונים מתעדכנים בזמן אמת מגיליון הממשל | מכרז 01-2024</span>
      </div>
    </div>
  );
};

export default GuideScreen;
