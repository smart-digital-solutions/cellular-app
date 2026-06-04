import { useState, useMemo } from 'react';
import {
  Calculator, Receipt, Smartphone, CalendarDays,
  CheckCircle2, AlertCircle, LogOut, UserMinus, Clock,
  Heart, ClipboardCheck, Info,
} from 'lucide-react';
import OmegaSelect from '../components/OmegaSelect';

// ─── מיפוי אייקונים מ-Sheets ───
const ICON_MAP = {
  CheckCircle2, LogOut, UserMinus, Clock, Heart, ClipboardCheck,
  AlertCircle, Info, Smartphone, Receipt,
};

// ─── צבעי categories ───
const CATEGORY_CONFIG = {
  end_of_term:   { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', icon: 'text-emerald-400', label: 'סיום תקין' },
  conditions:    { border: 'border-indigo-500/30',  bg: 'bg-indigo-500/10',  icon: 'text-indigo-400',  label: 'תנאי חובה' },
  early_exit:    { border: 'border-amber-500/30',   bg: 'bg-amber-500/10',   icon: 'text-amber-400',   label: 'יציאה מוקדמת' },
  special_cases: { border: 'border-slate-500/30',   bg: 'bg-slate-500/10',   icon: 'text-slate-400',   label: 'מקרים מיוחדים' },
};

function RuleCard({ rule }) {
  const IconCmp = ICON_MAP[rule.icon] || Info;
  const cfg = CATEGORY_CONFIG[rule.category] || CATEGORY_CONFIG.special_cases;
  const contentLines = String(rule.content || '').split('. ').filter(Boolean);

  return (
    <div className={`rounded-2xl border p-5 transition-all duration-200 hover:shadow-lg ${cfg.border} ${cfg.bg}`}>
      <div className="flex items-start gap-3">
        <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-white/10`} aria-hidden="true">
          <IconCmp className={`w-5 h-5 ${cfg.icon}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h4 className="font-black text-sm text-white">{rule.title}</h4>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.border} ${cfg.icon} bg-white/5`}>
              {cfg.label}
            </span>
          </div>
          <ul className="space-y-1">
            {contentLines.map((line, i) => (
              <li key={i} className="text-slate-300 text-xs leading-relaxed flex items-start gap-1.5">
                <span className="mt-1 shrink-0 w-1 h-1 rounded-full bg-slate-500 inline-block" />
                {line.endsWith('.') ? line : line + '.'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const TerminationScreen = ({ catalog, catalogIsFallback, groupedCatalog, terminationRules = [] }) => {
  const [selectedTermDevice, setSelectedTermDevice] = useState('');
  const [activeStep, setActiveStep] = useState(null);
  const [receiptDate, setReceiptDate] = useState('');

  const termDevice = useMemo(() => catalog?.find(d => d.id === selectedTermDevice), [catalog, selectedTermDevice]);

  const monthsElapsed = useMemo(() => {
    if (!receiptDate) return null;
    const start = new Date(receiptDate);
    const now = new Date();
    return Math.max(0, (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()));
  }, [receiptDate]);

  const monthsRemaining = monthsElapsed !== null ? Math.max(0, 24 - monthsElapsed) : null;
  const terminationPenalty = termDevice && monthsRemaining !== null
    ? (termDevice.matrix && termDevice.matrix[monthsRemaining] !== undefined
      ? termDevice.matrix[monthsRemaining]
      : parseFloat((termDevice.totalCost * monthsRemaining).toFixed(2)))
    : null;
  const leaseEndDate = receiptDate
    ? new Date(new Date(receiptDate).setMonth(new Date(receiptDate).getMonth() + 24))
    : null;
  const isLeaseExpired = monthsElapsed !== null && monthsElapsed >= 24;

  // קיבוץ כללים לפי category
  const rulesByCategory = useMemo(() => {
    const order = ['end_of_term', 'conditions', 'early_exit', 'special_cases'];
    return order
      .map(cat => ({ cat, rules: terminationRules.filter(r => r.category === cat) }))
      .filter(g => g.rules.length > 0);
  }, [terminationRules]);

  return (
    <div className={`animate-in fade-in max-w-4xl mx-auto relative ${activeStep === 3 ? 'z-50' : 'z-10'}`} style={{ color: 'var(--clr-text-1)' }}>
      {/* ── כותרת ── */}
      <div className="text-center mb-10 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-[#4F46E5] dark:text-indigo-300 font-bold text-xs mb-4 border border-indigo-100 dark:border-indigo-800">
          <Receipt className="w-3.5 h-3.5" /> מחשבון סיום מוקדם
        </div>
        <h2 className="text-4xl font-black mb-3" style={{ color: 'var(--clr-text-1)' }}>
          חישוב יתרת{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">ליסינג</span>
        </h2>
        <p className="text-sm font-medium max-w-xl mx-auto opacity-80" style={{ color: 'var(--clr-text-2)' }}>
          סיום התקשרות לפני תום 24 חודשים דורש תשלום קנס בגין החודשים שנותרו, או לחילופין
          רכישת המכשיר בעלות מופחתת (15% מחודש 27, 35% מחודש 31).
        </p>
      </div>

      {/* ── מחשבון ── */}
      <div className="grid md:grid-cols-2 gap-6 items-start mb-12">
        <div className="space-y-6">
          {/* בחירת מכשיר */}
          <div className={`border rounded-[1.5rem] p-6 shadow-xl relative overflow-visible ${activeStep === 3 ? 'z-50' : 'z-10'}`} style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}>
            <div className="absolute top-0 right-0 w-2 h-full bg-[#4F46E5] rounded-r-[1.5rem]" />
            <h3 className="font-black text-xl mb-5 flex items-center gap-2" style={{ color: 'var(--clr-text-1)' }}>
              <Smartphone className="w-5 h-5 text-[#4F46E5]" /> בחירת מכשיר ליסינג
            </h3>
            <OmegaSelect
              value={selectedTermDevice}
              onChange={(e) => setSelectedTermDevice(e.target.value)}
              options={groupedCatalog}
              placeholder="-- בחר/י מכשיר מתוך הקטלוג --"
              groups={true}
              onOpenChange={(open) => open ? setActiveStep(3) : setActiveStep(null)}
            />
          </div>

          {/* תאריך קבלה */}
          <div className="border rounded-[1.5rem] p-6 shadow-xl relative overflow-hidden" style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}>
            <div className="absolute top-0 right-0 w-2 h-full bg-[#06B6D4] rounded-r-[1.5rem]" />
            <h3 className="font-black text-xl mb-5 flex items-center gap-2" style={{ color: 'var(--clr-text-1)' }}>
              <CalendarDays className="w-5 h-5 text-[#06B6D4]" /> מתי קיבלת את המכשיר?
            </h3>
            <div className="relative">
              <input
                type="month"
                value={receiptDate}
                onChange={(e) => setReceiptDate(e.target.value)}
                className="w-full border text-base rounded-2xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 block p-4 pe-11 font-bold transition-all"
                style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)', color: 'var(--clr-text-1)' }}
              />
              <CalendarDays className="w-5 h-5 text-slate-400 absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {monthsElapsed !== null && (
              <div className="mt-4 flex items-center justify-between text-sm font-bold p-3 rounded-xl border" style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)', color: 'var(--clr-text-2)' }}>
                <span>חודשים שעברו: <span style={{ color: 'var(--clr-text-1)' }}>{monthsElapsed} מתוך 24</span></span>
                {leaseEndDate && <span>סיום רשמי: <span style={{ color: 'var(--clr-text-1)' }}>{leaseEndDate.toLocaleDateString('he-IL', { month: '2-digit', year: 'numeric' })}</span></span>}
              </div>
            )}
          </div>
        </div>

        {/* כרטיס סיכום */}
        <div className="bg-[#0B1120] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden text-white border border-white/10 sticky top-28">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#4F46E5]/10 to-[#06B6D4]/10 pointer-events-none" />
          <div className="flex flex-col gap-4 mb-6">
            <h3 className="text-xl font-black flex items-center gap-2"><Receipt className="w-5 h-5 text-[#06B6D4]" /> סיכום לתשלום</h3>
            {catalogIsFallback && (
              <div className="bg-amber-500/20 border border-amber-500/40 rounded-xl p-3 flex items-start gap-2 text-amber-200">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
                <div className="text-sm">
                  <span className="font-bold block mb-1">שימו לב: סכום משוערך בלבד</span>
                  הנתונים נשאבים מגיליון הגיבוי — יש לאמת מול אמרכלות המשרד.
                </div>
              </div>
            )}
          </div>

          {!termDevice || !receiptDate ? (
            <div className="text-center py-10 opacity-50">
              <Calculator className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-bold">בחר מכשיר ותאריך קבלה לחישוב יתרת הליסינג</p>
            </div>
          ) : isLeaseExpired ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-white mb-2">תקופת הליסינג הסתיימה!</h4>
              <p className="text-slate-300 text-sm">עברו {monthsElapsed} חודשים. אינך נדרש לשלם קנס על סיום התקשרות.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400 font-medium">עלות חודשית</span>
                <span className="font-bold">{termDevice.totalCost.toFixed(2)} ₪</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400 font-medium">חודשים שנותרו לתשלום</span>
                <span className="font-black text-amber-400 text-lg">{monthsRemaining} חודשים</span>
              </div>
              <div className="pt-2">
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-4">
                  <div className="text-red-400 text-xs font-bold mb-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> תשלום לסיום + החזרת המכשיר (ללא רכישה)
                  </div>
                  <div className="text-3xl font-black text-white">{terminationPenalty.toFixed(2)} <span className="text-lg text-red-300">₪</span></div>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-4 mb-4">
                  <div className="text-indigo-400 text-xs font-bold mb-1 flex items-center gap-1">
                    <Smartphone className="w-3 h-3" /> עלות רכישת מכשיר בסוף תקופה
                  </div>
                  <div className="text-xl font-black text-white">{termDevice.buyoutPrice.toFixed(2)} <span className="text-sm text-indigo-300">₪</span></div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400" />
                  <div className="text-emerald-400 text-xs font-black mb-1 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> סיום + רכישת המכשיר
                  </div>
                  <div className="text-3xl font-black text-white">
                    {(terminationPenalty + termDevice.buyoutPrice).toFixed(2)} <span className="text-lg text-emerald-300">₪</span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 font-medium">* כולל פירעון יתרת חודשי הליסינג ועלות הרכישה הסופית.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── כללי סיום ויציאה (מ-Google Sheets) ── */}
      {terminationRules.length > 0 && (
        <div className="relative rounded-[2rem] bg-[#0B1120] border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 pointer-events-none rounded-[2rem]" />
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-white mb-2">כללי סיום ויציאה מוקדמת</h3>
            <p className="text-slate-400 text-sm mb-8">מסמך המכרז 01-2024 — כל המקרים הקריטיים שחשוב להכיר.</p>
            <div className="space-y-8">
              {rulesByCategory.map(({ cat, rules }) => (
                <div key={cat}>
                  <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full inline-block ${CATEGORY_CONFIG[cat]?.bg?.replace('bg-', 'bg-').replace('/10', '')}`} style={{ backgroundColor: cat === 'end_of_term' ? '#10b981' : cat === 'conditions' ? '#6366f1' : cat === 'early_exit' ? '#f59e0b' : '#64748b' }} />
                    {CATEGORY_CONFIG[cat]?.label || cat}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rules.map(r => <RuleCard key={r.id} rule={r} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminationScreen;
