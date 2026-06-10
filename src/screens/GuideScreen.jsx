import {
  Sparkles, CreditCard, Smartphone, Shield, ShieldCheck, Watch,
  Truck, RotateCcw, Link2, Shuffle, Database, Globe2,
  CheckCircle2, ShieldAlert, PhoneCall, Phone, Plug, Wrench,
  Clock, UserPlus, PackageX, Ban
} from 'lucide-react';
import { FALLBACK_GUIDE } from '../fallbackData';

const ICON_MAP = {
  CreditCard, Smartphone, Shield, ShieldCheck, Watch,
  Truck, RotateCcw, Link2, Shuffle, Database, Globe2,
  CheckCircle2, ShieldAlert, PhoneCall, Phone, Plug, Wrench,
  Clock, UserPlus, PackageX, Ban
};

const getIcon = (iconName) => {
  return ICON_MAP[iconName] || Sparkles;
};

const getLeasingItemConfig = (text) => {
  if (text.includes('דקות') || text.includes('שיחות')) {
    return {
      icon: Phone,
      bgClass: 'bg-emerald-100 dark:bg-emerald-500/20',
      iconClass: 'text-emerald-600 dark:text-emerald-400',
      liClass: 'flex items-start gap-3'
    };
  }
  if (text.includes('בארץ') || text.includes('טרה') || text.includes('1TB')) {
    return {
      icon: Globe2,
      bgClass: 'bg-emerald-100 dark:bg-emerald-500/20',
      iconClass: 'text-emerald-600 dark:text-emerald-400',
      liClass: 'flex items-start gap-3'
    };
  }
  if (text.includes('מטען')) {
    return {
      icon: Plug,
      bgClass: 'bg-indigo-100 dark:bg-indigo-500/20',
      iconClass: 'text-indigo-600 dark:text-indigo-400',
      liClass: 'flex items-start gap-3'
    };
  }
  if (text.includes('חו"ל') || text.includes('חבילת חו')) {
    return {
      icon: Globe2,
      bgClass: 'bg-cyan-100 dark:bg-cyan-500/20',
      iconClass: 'text-cyan-600 dark:text-cyan-400',
      liClass: 'flex items-start gap-3'
    };
  }
  if (text.includes('תיקון') || text.includes('תיקונים')) {
    return {
      icon: Wrench,
      bgClass: 'bg-blue-100 dark:bg-blue-500/20',
      iconClass: 'text-blue-600 dark:text-blue-400',
      liClass: 'flex items-start gap-3'
    };
  }
  if (text.includes('צימוד') || text.includes('Pairing')) {
    return {
      icon: ShieldAlert,
      bgClass: 'bg-pink-100 dark:bg-pink-500/20',
      iconClass: 'text-pink-600 dark:text-pink-400',
      liClass: 'flex items-start gap-3 sm:col-span-2 mt-2 font-bold'
    };
  }
  // Default fallback
  return {
    icon: Sparkles,
    bgClass: 'bg-slate-100 dark:bg-white/10',
    iconClass: 'text-slate-700 dark:text-slate-300',
    liClass: 'flex items-start gap-3'
  };
};

const renderItemText = (text, iconColorClass) => {
  const colonIndex = text.indexOf(':');
  let boldPart = '';
  let regularPart = text;
  
  if (colonIndex !== -1) {
    boldPart = text.substring(0, colonIndex + 1);
    regularPart = text.substring(colonIndex + 1);
  }

  // Regex to match ONLY the price and ₪ (e.g., "8.1 ₪", "35.30 ₪", "5,000 ₪")
  const priceRegex = /((?:\+\s*)?(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?\s*₪)/g;
  
  const renderPart = (part) => {
    if (typeof part !== 'string') return part;
    const parts = part.split(priceRegex);
    return parts.map((p, i) => {
      if (p && p.match(priceRegex)) {
        return (
          <span key={i} className={`font-black text-lg ${iconColorClass || 'text-[#4F46E5] dark:text-[#06B6D4]'}`}>
            {p}
          </span>
        );
      }
      return <span key={i}>{p}</span>;
    });
  };

  if (boldPart) {
    return (
      <span>
        <strong className="font-bold">{boldPart}</strong>
        {renderPart(regularPart)}
      </span>
    );
  }
  return <span>{renderPart(text)}</span>;
};

const GuideCard = ({ card }) => {
  const IconComponent = getIcon(card.icon);
  const items = Array.isArray(card.items)
    ? card.items
    : (typeof card.items === 'string'
        ? card.items.split('|').map(s => s.trim()).filter(Boolean)
        : []);

  let iconBgClass = "bg-slate-100 dark:bg-white/10";
  let iconColorClass = "text-slate-700 dark:text-slate-300";
  
  if (card.style === 'cyan') {
    iconBgClass = "bg-cyan-50 dark:bg-cyan-950/40";
    iconColorClass = "text-cyan-600 dark:text-cyan-400";
  } else if (card.style === 'warning') {
    iconBgClass = "bg-amber-50 dark:bg-amber-950/40";
    iconColorClass = "text-amber-600 dark:text-amber-500";
  } else if (card.style === 'danger') {
    iconBgClass = "bg-red-50 dark:bg-red-950/40";
    iconColorClass = "text-red-600 dark:text-red-400";
  } else if (card.style === 'dark') {
    iconBgClass = "bg-indigo-100 dark:bg-indigo-950/40";
    iconColorClass = "text-[#4F46E5] dark:text-[#06B6D4]";
  } else {
    iconBgClass = "bg-indigo-50 dark:bg-indigo-950/40";
    iconColorClass = "text-indigo-600 dark:text-indigo-400";
  }

  // ── Unified Dynamic Card Renderer ──
  // Replaces the custom rigid cards with a purely dynamic renderer
  // that strictly respects the Google Sheets `items` array.

  return (
    <div 
      className="premium-glass rounded-[1.5rem] border p-6 flex flex-col transition-all duration-300 hover:shadow-2xl hover-lift relative text-right"
      style={{ borderColor: 'var(--clr-border)', backgroundColor: 'var(--clr-surface)' }}
    >
      <div className="flex items-start justify-between gap-2 mb-4">
        <div>
          {card.badge && (
            <span className={`inline-block mb-2 text-[10px] font-black px-2 py-0.5 rounded-full border ${iconBgClass.replace('bg-', 'border-').replace('dark:bg-', 'dark:border-')} ${iconColorClass}`}>
              {card.badge}
            </span>
          )}
          <h4 className="font-black text-lg leading-tight" style={{ color: 'var(--clr-text-1)' }}>
            {card.title}
          </h4>
          {card.subtitle && (
            <p className="text-xs font-semibold mt-0.5 opacity-60" style={{ color: 'var(--clr-text-3)' }}>
              {card.subtitle}
            </p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBgClass}`}>
          <IconComponent className={`w-5 h-5 ${iconColorClass}`} aria-hidden="true" />
        </div>
      </div>

      <ul className="text-sm font-medium opacity-90 space-y-2.5 flex-grow mb-4">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
            <span className={`${iconColorClass} select-none mt-0.5 shrink-0`}>•</span>
            <span className="leading-relaxed">{renderItemText(item, iconColorClass)}</span>
          </li>
        ))}
      </ul>

      {card.footer && (
        <div 
          className="mt-auto pt-3 border-t text-xs opacity-75 font-semibold text-slate-500 dark:text-slate-400"
          style={{ borderColor: 'var(--clr-border)' }}
        >
          {card.footer}
        </div>
      )}
    </div>
  );
};

const GuideScreen = ({ guide }) => {
  const guideData = (guide && guide.length > 0) ? guide : FALLBACK_GUIDE;

  const plans = guideData.filter(item => item.section === 'plans');
  const simOnly = plans.find(item => item.id === 'sim_only_plan') || FALLBACK_GUIDE.find(item => item.id === 'sim_only_plan');
  const leasing = plans.find(item => item.id === 'leasing_plan') || FALLBACK_GUIDE.find(item => item.id === 'leasing_plan');
  const otherPlans = plans.filter(item => item.id !== 'sim_only_plan' && item.id !== 'leasing_plan');

  const instructions = guideData.filter(item => item.section === 'instructions');
  const roaming = guideData.filter(item => item.section === 'roaming');

  const simOnlyItems = simOnly ? (
    Array.isArray(simOnly.items)
      ? simOnly.items
      : (typeof simOnly.items === 'string'
          ? simOnly.items.split('|').map(s => s.trim()).filter(Boolean)
          : [])
  ) : [];

  const leasingItems = leasing ? (
    Array.isArray(leasing.items)
      ? leasing.items
      : (typeof leasing.items === 'string'
          ? leasing.items.split('|').map(s => s.trim()).filter(Boolean)
          : [])
  ) : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative z-10 max-w-6xl mx-auto" style={{ color: 'var(--clr-text-1)' }}>
      <div className="text-center max-w-3xl mx-auto mb-10 pt-4">
        <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight" style={{ color: 'var(--clr-text-1)' }}>
          המדריך למכרז <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">2026</span>
        </h2>
        <p className="text-base font-medium opacity-80" style={{ color: 'var(--clr-text-2)' }}>
          ריכזנו עבורך את עיקר הנתונים מתוך תקציר השירותים הממשלתי. השוואת מסלולים, כללים והנחיות להתקשרות.
        </p>
      </div>

      {/* Plans Section Top Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {simOnly && (
          <div 
            className="lg:col-span-1 premium-glass rounded-[2rem] border p-6 flex flex-col transition-all duration-300 hover:shadow-2xl hover-lift" 
            style={{ borderColor: 'var(--clr-border)', backgroundColor: 'var(--clr-surface)' }}
          >
            <div className="bg-slate-100 dark:bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
              <CreditCard className="w-6 h-6 text-slate-700 dark:text-slate-300" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-black mb-5" style={{ color: 'var(--clr-text-1)' }}>
              {simOnly.title}
              <br />
              <span className="font-medium text-base opacity-60" style={{ color: 'var(--clr-text-3)' }}>
                {simOnly.subtitle}
              </span>
            </h3>
            <ul className="space-y-4 flex-grow mb-6">
              {simOnlyItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 dark:text-slate-400 shrink-0 mt-1" aria-hidden="true" />
                  <span className="font-medium text-sm leading-relaxed" style={{ color: 'var(--clr-text-2)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            {simOnly.footer && (
              <div 
                className="mt-6 border rounded-xl p-4 text-xs font-bold leading-relaxed" 
                style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)', color: 'var(--clr-text-2)' }}
              >
                {simOnly.footer}
              </div>
            )}
          </div>
        )}

        {leasing && (
          <div className="lg:col-span-2 relative rounded-[2rem] bg-white/90 dark:bg-[#0B1120] p-6 sm:p-10 flex flex-col h-full shadow-xl dark:shadow-2xl border border-slate-200 dark:border-white/10 transition-all duration-300 hover:shadow-2xl hover-lift">
            <div className="flex flex-col-reverse sm:flex-row justify-between items-start mb-6 gap-4">
              <div className="bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <Smartphone className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              {leasing.badge && (
                <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                  {leasing.badge}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
              {leasing.title}
            </h3>
            {leasing.subtitle && (
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 text-sm">
                {leasing.subtitle}
              </p>
            )}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 flex-grow mb-6">
              {leasingItems.map((item, idx) => {
                const config = getLeasingItemConfig(item);
                const IconComp = config.icon;
                return (
                  <li key={idx} className={config.liClass}>
                    <div className={`p-1.5 rounded-full shrink-0 mt-0.5 ${config.bgClass}`}>
                      <IconComp className={`w-4 h-4 ${config.iconClass}`} aria-hidden="true" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                      {renderItemText(item, config.iconClass)}
                    </span>
                  </li>
                );
              })}
            </ul>
            {leasing.footer && (
              <div className="mt-auto pt-3 border-t text-xs opacity-75 font-semibold text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10">
                {leasing.footer}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Other Plans Grid */}
      {otherPlans.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {otherPlans.map(card => (
            <GuideCard key={card.id} card={card} />
          ))}
        </section>
      )}

      {/* Instructions Section */}
      {instructions.length > 0 && (
        <section className="relative rounded-[2rem] overflow-hidden shadow-xl border p-6 sm:p-10 transition-all duration-300 hover:shadow-2xl" style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}>
          <h3 className="text-2xl font-black mb-6 flex items-center gap-3" style={{ color: 'var(--clr-text-1)' }}>
            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-xl">
              <ShieldAlert className="w-6 h-6 text-red-500" aria-hidden="true" />
            </div>
            הנחיות לפני שדרוג / ניוד ומעבר ספק
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {instructions.map(card => (
              <GuideCard key={card.id} card={card} />
            ))}
          </div>
        </section>
      )}

      {/* Roaming Section */}
      {roaming.length > 0 && (
        <section className="relative rounded-[2rem] overflow-hidden shadow-xl bg-slate-50 dark:bg-[#0B1120] border border-cyan-200 dark:border-cyan-900/30 p-6 sm:p-10 transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">חבילות הגלישה בחו"ל (נדידה בחו"ל)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roaming.map(card => (
              <GuideCard key={card.id} card={card} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default GuideScreen;
