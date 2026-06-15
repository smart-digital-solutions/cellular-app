import { useState } from 'react';
import { Smartphone, CheckCircle2 } from 'lucide-react';
import OmegaSelect from '../components/OmegaSelect';

// Tier-matching helpers
const normalizeTier = (s) => String(s || '').replace(/[\s,₪ש"ח]/g, '');
const checkTierMatch = (tier1, tier2) => {
  if (!tier1 || !tier2) return false;
  const n1 = normalizeTier(tier1);
  const n2 = normalizeTier(tier2);
  return n1 === n2 || n1.includes(n2) || n2.includes(n1);
};

const formatCurrency = (val) => {
  if (typeof val !== 'string' && typeof val !== 'number') return val;
  const s = String(val).trim();
  if (!s) return s;
  // If it has letters, %, or other non-numeric symbols, return as is
  if (/[^\d.,₪\s-]/.test(s)) return s;
  
  const num = parseFloat(s.replace(/,/g, '').replace(/₪/g, ''));
  if (!isNaN(num)) {
    return num.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₪';
  }
  return s;
};

const MaintenanceScreen = ({ maintenance, catalog, groupedCatalog }) => {
  const [selectedMaintDevice, setSelectedMaintDevice] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto relative z-10" style={{ color: 'var(--clr-text-1)' }}>
      <div className="relative z-50 rounded-[2rem] bg-white/90 dark:bg-[#0B1120] text-slate-900 dark:text-white p-6 sm:p-10 shadow-xl dark:shadow-2xl border border-slate-200 dark:border-white/10 backdrop-blur-md transition-colors duration-300">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 pointer-events-none"></div>
        <div className="relative z-10">

          <h2 className="text-3xl font-black mb-4">מחירון תחזוקה והשתתפות בנזקים</h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-8 max-w-4xl text-balance">
            מסלול הליסינג כולל שירות תיקונים. במקרים של אובדן/גניבה/השבתה, קיימת השתתפות עצמית לפי מחירון המכרז, <span className="whitespace-nowrap">כולל מע&quot;מ (18%).</span>
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <label className="block text-cyan-400 text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> בדוק איזה מחירון תקף למכשיר שלך:
            </label>
            <OmegaSelect
              value={selectedMaintDevice}
              onChange={(e) => setSelectedMaintDevice(e.target.value)}
              options={groupedCatalog}
              placeholder="-- בחר מכשיר לבדיקה --"
              groups={true}
            />
            {selectedMaintDevice && (() => {
              const device = catalog?.find(d => d.id === selectedMaintDevice);
              return device ? (
                <div className="mt-4 text-emerald-400 text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="w-4 h-4" /> המכשיר שלך שייך למדרגה: <span className="underline decoration-2 underline-offset-4">{device.maintenanceTier}</span>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      </div>

      <div className="border rounded-[1.5rem] shadow-xl overflow-hidden" style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}>
        <div className="overflow-x-auto pb-2">
          <table className="w-full text-right border-collapse min-w-[800px]" id="maintenance-table">
            <thead>
              <tr className="border-b" style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' }}>
                <th className="p-4 font-black text-base" style={{ color: 'var(--clr-text-1)' }}>מחירון משוקלל</th>
                <th className="p-4 border-r" style={{ borderColor: 'var(--clr-border)' }}><div className="text-xs font-bold mb-1 opacity-60">שבר מסך</div><div className="font-black text-indigo-700 dark:text-indigo-400 text-sm">פעם ראשונה</div></th>
                <th className="p-4 border-r" style={{ borderColor: 'var(--clr-border)' }}><div className="text-xs font-bold mb-1 opacity-60">שבר מסך</div><div className="font-black text-indigo-700 dark:text-indigo-400 text-sm">פעם שנייה+</div></th>
                <th className="p-4 border-r bg-red-50/50 dark:bg-red-900/10" style={{ borderColor: 'var(--clr-border)' }}><div className="text-xs text-red-500 font-bold mb-1">אובדן/גניבה</div><div className="font-black text-red-700 dark:text-red-400 text-sm">פעם ראשונה</div></th>
                <th className="p-4 border-r bg-amber-50/50 dark:bg-amber-900/10" style={{ borderColor: 'var(--clr-border)' }}><div className="text-xs text-amber-600 font-bold mb-1">השבתה (טוטאלוס)</div><div className="font-black text-amber-700 dark:text-amber-400 text-sm">פעם ראשונה</div></th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--clr-border)' }}>
              {maintenance.map((row, idx) => {
                const isHighlighted = selectedMaintDevice && (() => {
                  const device = catalog?.find(d => d.id === selectedMaintDevice);
                  return device && checkTierMatch(row.tier, device.maintenanceTier);
                })();
                return (
                  <tr key={idx} className={`transition-all duration-300 ${isHighlighted ? 'bg-cyan-50 dark:bg-cyan-900/20 z-10 relative shadow-[0_4px_20px_rgba(6,182,212,0.2)]' : 'hover:bg-slate-50 dark:hover:bg-white/5 hover:shadow-sm'}`}>
                    <td className={`p-4 font-black text-sm border-y-2 border-r-2 ${isHighlighted ? 'text-cyan-800 dark:text-cyan-300 border-cyan-400 rounded-r-xl' : 'border-y-transparent border-r-transparent'}`} style={{ color: isHighlighted ? undefined : 'var(--clr-text-1)', backgroundColor: isHighlighted ? undefined : 'var(--clr-surface-2)' }}>{row.tier}</td>
                    <td className={`p-4 font-bold border-r text-sm border-y-2 ${isHighlighted ? 'text-cyan-900 dark:text-cyan-100 border-y-cyan-400 border-r-cyan-400/30' : 'border-y-transparent'}`} style={{ borderColor: isHighlighted ? undefined : 'var(--clr-border)', color: isHighlighted ? undefined : 'var(--clr-text-2)' }}>{formatCurrency(row.screen1)}</td>
                    <td className={`p-4 font-bold border-r text-sm border-y-2 ${isHighlighted ? 'text-cyan-900 dark:text-cyan-100 border-y-cyan-400 border-r-cyan-400/30' : 'border-y-transparent'}`} style={{ borderColor: isHighlighted ? undefined : 'var(--clr-border)', color: isHighlighted ? undefined : 'var(--clr-text-2)' }}>{formatCurrency(row.screen2)}</td>
                    <td className={`p-4 font-black border-r text-sm border-y-2 ${isHighlighted ? 'text-cyan-900 dark:text-cyan-100 border-y-cyan-400 border-r-cyan-400/30' : 'bg-red-50/20 dark:bg-red-900/5 text-red-600 dark:text-red-400 border-y-transparent'}`} style={{ borderColor: isHighlighted ? undefined : 'var(--clr-border)' }}>{formatCurrency(row.theft1)}</td>
                    <td className={`p-4 font-black border-r border-l-2 text-sm border-y-2 ${isHighlighted ? 'text-cyan-900 dark:text-cyan-100 border-y-cyan-400 border-r-cyan-400/30 border-l-cyan-400 rounded-l-xl' : 'bg-amber-50/20 dark:bg-amber-900/5 text-amber-600 dark:text-amber-400 border-y-transparent'}`} style={{ borderColor: isHighlighted ? undefined : 'var(--clr-border)' }}>{formatCurrency(row.disable1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceScreen;
