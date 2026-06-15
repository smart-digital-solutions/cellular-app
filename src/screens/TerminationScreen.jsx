import { useState, useMemo } from 'react';
import {
  Calculator, Receipt, Smartphone, CalendarDays,
  CheckCircle2, AlertCircle
} from 'lucide-react';
import OmegaSelect from '../components/OmegaSelect';

const TerminationScreen = ({ catalog, catalogIsFallback, groupedCatalog, settings }) => {
  const [selectedTermDevice, setSelectedTermDevice] = useState('');
  const [activeStep, setActiveStep] = useState(null);
  const [receiptDate, setReceiptDate] = useState('');

  const termDevice = useMemo(() => catalog?.find(d => d.id === selectedTermDevice), [catalog, selectedTermDevice]);

  const monthsElapsed = useMemo(() => {
    if (!receiptDate) return null;
    const start = new Date(receiptDate);
    const now = new Date();
    let diff = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (now.getDate() < start.getDate()) {
      diff--;
    }
    return Math.max(0, diff);
  }, [receiptDate]);

  const monthsRemaining = monthsElapsed !== null ? Math.max(0, 24 - monthsElapsed) : null;
  const terminationPenalty = termDevice && monthsRemaining !== null
    ? (termDevice.matrix && termDevice.matrix[monthsRemaining] !== undefined
      ? termDevice.matrix[monthsRemaining]
      : parseFloat((termDevice.totalCost * monthsRemaining).toFixed(2)))
    : null;
  
  const leaseEndDate = useMemo(() => {
    if (!receiptDate) return null;
    const d = new Date(receiptDate);
    d.setMonth(d.getMonth() + 24);
    return d;
  }, [receiptDate]);
  const isLeaseExpired = monthsElapsed !== null && monthsElapsed >= 24;

  return (
    <div className={`animate-in fade-in max-w-4xl mx-auto relative ${activeStep === 3 ? 'z-50' : 'z-10'}`} style={{ color: 'var(--clr-text-1)' }}>
      <div className="text-center mb-10 pt-4">

        <h2 className="text-4xl font-black mb-3" style={{ color: 'var(--clr-text-1)' }}>
          חישוב יתרת <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">ליסינג</span>
        </h2>
        <p className="text-base font-semibold max-w-4xl mx-auto" style={{ color: 'var(--clr-text-2)' }}>
          סיום ההתקשרות טרם השלמת 24 חודשים מלאים, יחייב את העובד בתשלום בגין יתרת החודשים שנותרו עד לתום תקופה זו.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-6">
          <div className={`border rounded-[1.5rem] p-6 shadow-xl relative overflow-visible ${activeStep === 3 ? 'z-50' : 'z-10'}`} style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}>
            <div className="absolute top-0 right-0 w-2 h-full bg-[#4F46E5]"></div>
            <h3 id="term-device-label" className="font-black text-xl mb-5 flex items-center gap-2" style={{ color: 'var(--clr-text-1)' }}>
              <Smartphone className="w-5 h-5 text-indigo-700 dark:text-indigo-400" aria-hidden="true" /> בחירת מכשיר ליסינג
            </h3>
            <OmegaSelect
              ariaLabelledBy="term-device-label"
              id="term-device-select"
              value={selectedTermDevice}
              onChange={(e) => setSelectedTermDevice(e.target.value)}
              options={groupedCatalog}
              placeholder="-- בחר/י מכשיר מתוך הקטלוג --"
              groups={true}
              onOpenChange={(open) => open ? setActiveStep(3) : setActiveStep(null)}
            />
          </div>

          <div className="border rounded-[1.5rem] p-6 shadow-xl relative overflow-hidden" style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}>
            <div className="absolute top-0 right-0 w-2 h-full bg-[#06B6D4]"></div>
            <label htmlFor="receipt-date-input" className="font-black text-xl mb-5 flex items-center gap-2" style={{ color: 'var(--clr-text-1)' }}>
              <CalendarDays className="w-5 h-5 text-cyan-700 dark:text-cyan-400" aria-hidden="true" /> מתי קיבלת את המכשיר?
            </label>
            <div className="relative">
              <input
                id="receipt-date-input"
                type="date"
                aria-label="תאריך קבלת המכשיר"
                value={receiptDate}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setReceiptDate(e.target.value)}
                className="w-full border text-base rounded-2xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 block p-4 pe-11 font-bold transition-all"
                style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)', color: 'var(--clr-text-1)' }}
              />
              <CalendarDays className="w-5 h-5 text-slate-400 absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            </div>
            {monthsElapsed !== null && (
              <div className="mt-4 flex items-center justify-between text-sm font-bold p-3 rounded-xl border" style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)', color: 'var(--clr-text-2)' }}>
                <span>חודשים שעברו: <span style={{ color: 'var(--clr-text-1)' }}>{monthsElapsed} מתוך 24</span></span>
                {leaseEndDate && <span>סיום רשמי: <span style={{ color: 'var(--clr-text-1)' }}>{leaseEndDate.toLocaleDateString('he-IL')}</span></span>}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/90 dark:bg-[#0B1120] backdrop-blur-xl rounded-[2rem] p-8 shadow-xl dark:shadow-2xl relative overflow-hidden text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 sticky top-28 transition-colors duration-300">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#4F46E5]/10 to-[#06B6D4]/10 pointer-events-none"></div>
          <div className="flex flex-col gap-4 mb-6">
            <h3 className="text-xl font-black flex items-center gap-2"><Receipt className="w-5 h-5 text-cyan-700 dark:text-cyan-400" aria-hidden="true" /> סיכום לתשלום</h3>
            {catalogIsFallback && (
              <div className="bg-amber-500/20 border border-amber-500/40 rounded-xl p-3 flex items-start gap-2 text-amber-200">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" aria-hidden="true" />
                <div className="text-sm">
                  <span className="font-bold block mb-1">שימו לב: סכום משוערך בלבד</span>
                  הנתונים נשאבים כעת מגיליון הגיבוי מאחר והקובץ הממשלתי הרשמי אינו זמין. יש לבדוק ולאמת את הסכומים מול אמרכלות המשרד לפני ביצוע כל רכישה או התנתקות.
                </div>
              </div>
            )}
          </div>

          {!termDevice || !receiptDate ? (
            <div className="text-center py-10 opacity-50">
              <Calculator className="w-12 h-12 mx-auto mb-3 opacity-20" aria-hidden="true" />
              <p className="font-bold">בחר מכשיר ותאריך קבלה לחישוב יתרת הליסינג</p>
            </div>
          ) : isLeaseExpired ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30"><CheckCircle2 className="w-8 h-8" aria-hidden="true" /></div>
              <h4 className="text-2xl font-black text-emerald-600 dark:text-white mb-2">תקופת הליסינג הסתיימה!</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm">עברו {monthsElapsed} חודשים. אינך נדרש לשלם קנס על סיום התקשרות.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
                <span className="text-slate-600 dark:text-slate-400 font-medium">עלות חודשית, כולל מע&quot;מ</span>
                <span className="font-bold">{termDevice.totalCost.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₪</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
                <span className="text-slate-600 dark:text-slate-400 font-medium">חודשים שנותרו לתשלום</span>
                <span className="font-black text-amber-400 text-lg">{monthsRemaining} חודשים</span>
              </div>
              <div className="pt-2">
                {/* 1. Matrix value (Total including buyout) */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 shadow-sm relative overflow-hidden group mb-4">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
                  <div className="text-emerald-600 dark:text-emerald-400 text-xs font-black mb-1 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> עלות לסיום תקופת ליסינג, כולל רכישת המכשיר ומע&quot;מ
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">
                    {terminationPenalty.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-lg text-emerald-500 dark:text-emerald-300">₪</span>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 font-medium">* הסכום נלקח ישירות ממטריצת החודשים באקסל.</div>
                </div>

                {/* 2. Matrix value minus buyout value (Remaining months ONLY) */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 relative overflow-hidden mb-4">
                  <div className="text-amber-600 dark:text-amber-400 text-xs font-bold mb-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" aria-hidden="true" /> יתרת חודשי הליסינג, ללא רכישת המכשיר (יש להחזירו), כולל מע&quot;מ</div>
                  <div className="text-2xl font-black text-slate-800 dark:text-white">{Math.max(0, terminationPenalty - termDevice.buyoutPrice).toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-lg text-amber-500 dark:text-amber-300">₪</span></div>
                  <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 font-medium">* הסכום מציג את העלות מהאקסל בהפחתת עלות הרכישה.</div>
                </div>

                {/* 3. Buyout value */}
                <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-4 relative overflow-hidden mb-4">
                  <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1 flex items-center gap-1"><Smartphone className="w-3 h-3" aria-hidden="true" /> עלות רכישת המכשיר בסיום התקופה, כולל מע&quot;מ</div>
                  <div className="text-xl font-black text-slate-800 dark:text-white">{termDevice.buyoutPrice.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-sm text-indigo-500 dark:text-indigo-300">₪</span></div>
                </div>

                {/* Clarification Note */}
                {settings?.leasing_clarification !== '' && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 relative overflow-hidden mt-6">
                    <div className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                      <p>{settings?.leasing_clarification || 'העלויות המחושבות תואמות את העלויות המעודכנות לתאריך הנוכחי, להערכת עלות. בפועל, יתרת הליסינג מחושבת לפי עלויות המכשיר במועד האספקה.'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminationScreen;
