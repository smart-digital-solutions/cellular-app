import { useState, useMemo } from 'react';
import {
  Building, Smartphone, AlertCircle, Info, GraduationCap,
  CheckCircle2, CreditCard, Sparkles, ShieldAlert, Headphones
} from 'lucide-react';
import OmegaSelect from '../components/OmegaSelect';
// Hero image from public/ — static URL allows preloading from index.html before React loads
const heroImage = `${import.meta.env.BASE_URL}cellular-hero.webp`;

const CalculatorScreen = ({ tiers, allDevices, accessoriesList }) => {
  const [selectedTier, setSelectedTier] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedAccessory, setSelectedAccessory] = useState('');
  const [activeStep, setActiveStep] = useState(null);

  const groupedDevices = useMemo(() => allDevices.reduce((acc, device) => {
    if (!acc[device.category]) acc[device.category] = [];
    acc[device.category].push(device);
    return acc;
  }, {}), [allDevices]);

  const handleTierChange = (val) => {
    setSelectedTier(val);
    const currentTier = tiers.find(t => t.id === val);
    if (currentTier?.restrictToSimOnly) {
      if (selectedDevice !== 'sim_only' && selectedDevice !== 'sim_only_repair' && selectedDevice !== '') {
        setSelectedDevice('');
      }
    }
  };

  const currentTier = tiers.find(t => t.id === selectedTier);
  const currentDevice = allDevices.find(d => d.id === selectedDevice);
  const currentAccessory = accessoriesList?.find(a => a.id === selectedAccessory) || null;
  
  const tierAllowance = currentTier?.allowance || 0;
  const deviceCost = currentDevice?.totalCost || 0;
  const accessoryCost = currentAccessory?.totalCost || 0;
  
  const totalCost = deviceCost + accessoryCost;
  const employeePayment = Math.max(0, totalCost - tierAllowance);

  return (
    <div className="space-y-4 animate-omega-smooth relative z-10" style={{ color: 'var(--clr-text-1)' }}>
      <div className="premium-glass text-sm p-4 rounded-[1.5rem] flex flex-col md:flex-row items-start md:items-center gap-4 border border-white/40 shadow-xl relative z-10 mb-1 transition-shadow duration-300 hover:shadow-2xl hover-lift">
        <div className="bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] p-3 rounded-xl shadow-lg shrink-0 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <div className="flex-1">

          <h2 className="font-black text-xl md:text-2xl mb-0.5 bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">ברוכים הבאים לסלולטור</h2>
          <p className="leading-tight text-xs md:text-sm font-medium opacity-80 max-w-3xl mb-2" style={{ color: 'var(--clr-text-2)' }}>
            הכלי המוביל לבחירה פשוטה, נוחה ויעילה של המסלול המנצח במכרז הסלולר הממשלתי.<br />
            שקיפות במכסת ההשתתפות, עלויות הליסינג וההשתתפות עצמית, עבור עובדי המדינה.
          </p>
          <div className="border rounded-lg p-2 flex items-center gap-2 animate-in slide-in-from-right duration-1000" style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' }}>
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
            <p className="text-[11px] font-bold leading-none" style={{ color: 'var(--clr-text-1)' }}>עלות הליסינג מתעדכנת בהתאם למחירי השוק</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10 items-start">
        <div className="flex flex-col gap-4 relative z-30">
          <section className={`premium-glass p-5 rounded-[1.5rem] omega-shadow border border-white/50 relative group flex flex-col transition-shadow duration-300 hover:shadow-2xl hover-lift will-change-xform ${activeStep === 1 ? 'z-50' : 'z-40'}`}>
            <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-[#4F46E5] to-[#818CF8]"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2.5 rounded-xl"><Building className="w-5 h-5 text-indigo-700 dark:text-indigo-400" aria-hidden="true" /></div>
              <h3 id="step1-label" className="text-lg font-black" style={{ color: 'var(--clr-text-1)' }}>שלב 1: דירוג זכאות</h3>
            </div>
            <OmegaSelect
              ariaLabelledBy="step1-label"
              id="tier-select"
              value={selectedTier}
              onChange={(e) => handleTierChange(e.target.value)}
              options={tiers}
              placeholder="-- בחר/י את הדרגה שלך --"
              onOpenChange={(open) => open ? setActiveStep(1) : setActiveStep(null)}
            />
            {currentTier && (
              <div className="mt-3 border rounded-[1rem] p-3 flex items-start gap-3 relative overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-200 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800"></div>
                <GraduationCap className="w-5 h-5 text-indigo-500 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-bold text-indigo-700 dark:text-indigo-400 text-xs mb-0.5">{currentTier.label}</div>
                  <div className="font-medium text-xs leading-relaxed" style={{ color: 'var(--clr-text-2)' }}>{currentTier.desc}</div>
                </div>
              </div>
            )}
          </section>

          {selectedTier && (
            <div className={`animate-omega-spring relative ${activeStep === 2 ? 'z-40' : 'z-30'}`}>
              <section className="premium-glass p-5 rounded-[1.5rem] omega-shadow border border-white/50 relative flex flex-col transition-shadow duration-300 hover:shadow-2xl hover-lift will-change-xform">
                <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-[#06B6D4] to-[#38BDF8]"></div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-cyan-50 dark:bg-cyan-900/20 p-2.5 rounded-xl"><Smartphone className="w-5 h-5 text-cyan-700 dark:text-cyan-400" aria-hidden="true" /></div>
                    <h3 id="step2-label" className="text-lg font-black" style={{ color: 'var(--clr-text-1)' }}>שלב 2: מכשיר / מסלול</h3>
                  </div>
                  {currentTier?.restrictToSimOnly && (
                    <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-[10px] px-2 py-1 rounded-lg font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" /> סים בלבד
                    </span>
                  )}
                </div>
                <OmegaSelect
                  ariaLabelledBy="step2-label"
                  id="device-select"
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  options={groupedDevices}
                  placeholder="-- בחר/י מסלול או מכשיר --"
                  disabled={!selectedTier}
                  groups={true}
                  onOpenChange={(open) => open ? setActiveStep(2) : setActiveStep(null)}
                />
                {currentDevice && (
                  <div className="mt-3 border rounded-[1rem] p-3 flex items-start gap-3 relative overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--clr-surface-2)', borderColor: 'var(--clr-border)' }}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-200 to-cyan-100 dark:from-cyan-900 dark:to-cyan-800"></div>
                    <Info className="w-5 h-5 text-cyan-500 shrink-0" aria-hidden="true" />
                    <div>
                      <div className="font-bold text-cyan-700 dark:text-cyan-400 text-xs mb-0.5">{currentDevice.label}</div>
                      <div className="font-medium text-xs leading-relaxed" style={{ color: 'var(--clr-text-2)' }}>העלות כוללת חבילת תקשורת ומע&quot;מ (18%).</div>
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}

          {selectedTier && selectedDevice && accessoriesList && accessoriesList.length > 0 && (
            <div className={`animate-omega-spring relative ${activeStep === 3 ? 'z-30' : 'z-20'}`}>
              <section className="premium-glass p-5 rounded-[1.5rem] omega-shadow border border-white/50 relative flex flex-col transition-shadow duration-300 hover:shadow-2xl hover-lift will-change-xform">
                <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-[#8B5CF6] to-[#D946EF]"></div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-2.5 rounded-xl"><Headphones className="w-5 h-5 text-purple-700 dark:text-purple-400" aria-hidden="true" /></div>
                    <h3 id="step3-label" className="text-lg font-black" style={{ color: 'var(--clr-text-1)' }}>שלב 3: ציוד נלווה (אופציונלי)</h3>
                  </div>
                </div>
                <OmegaSelect
                  ariaLabelledBy="step3-label"
                  id="accessory-select"
                  value={selectedAccessory}
                  onChange={(e) => setSelectedAccessory(e.target.value)}
                  options={[
                    { id: '', label: 'ללא אביזר' },
                    ...accessoriesList.map(acc => ({
                      id: acc.id,
                      label: `${acc.label} (תוספת ${acc.totalCost.toFixed(2)} ₪)`,
                    }))
                  ]}
                  placeholder="-- בחירת ציוד נלווה --"
                  onOpenChange={(open) => open ? setActiveStep(3) : setActiveStep(null)}
                />
              </section>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Receipt / Image */}
        <div className="relative rounded-[1.5rem] shadow-2xl border border-slate-200 dark:border-white/10 group min-h-[350px] lg:min-h-[380px] h-full flex flex-col sticky top-24 bg-white/90 dark:bg-[#0B1120] backdrop-blur-xl overflow-hidden hover-lift transition-colors duration-300">
          <img
            src={heroImage}
            alt=""
            role="presentation"
            width="800"
            height="1000"
            fetchPriority="high"
            loading="eager"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${selectedTier && selectedDevice ? 'opacity-10 dark:opacity-20 scale-105 mix-blend-multiply dark:mix-blend-screen grayscale' : 'opacity-60 dark:opacity-80 scale-100 hover:scale-105 mix-blend-multiply dark:mix-blend-normal'}`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${selectedTier && selectedDevice ? 'from-white via-white/80 dark:from-[#0B1120] dark:via-[#0B1120]/80 to-transparent' : 'from-white dark:from-[#0B1120] via-transparent to-transparent'} pointer-events-none transition-colors duration-1000`}></div>

          <div className="relative z-10 flex flex-col h-full p-6 lg:p-8 pt-12 lg:pt-16">
            {selectedTier && selectedDevice && currentTier && currentDevice ? (
              <div className="animate-in fade-in zoom-in duration-500 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-2 rounded-full border border-emerald-500/20 dark:border-emerald-500/30"><CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" aria-hidden="true" /></div>
                    <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-300">סיכום עלויות</h3>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium ms-10">משקלל השתתפות ומע&quot;מ (18%)</p>
                </div>
                <div className="mt-3 space-y-6">
                  <div className={`grid gap-4 ${currentAccessory ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    <div className="col-span-full bg-indigo-50/50 dark:bg-indigo-900/10 backdrop-blur-md p-4 rounded-xl border border-indigo-200/50 dark:border-indigo-800/30 shadow-inner">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mb-0.5 uppercase tracking-wider">
                        <Building className="w-3.5 h-3.5" aria-hidden="true" />
                        דירוג
                      </span>
                      <span className="font-bold text-sm text-indigo-900 dark:text-indigo-200 leading-tight block truncate">{currentTier.label}</span>
                    </div>
                    <div className="bg-cyan-50/50 dark:bg-cyan-900/10 backdrop-blur-md p-4 rounded-xl border border-cyan-200/50 dark:border-cyan-800/30 shadow-inner">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 mb-0.5 uppercase tracking-wider">
                        <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
                        מכשיר
                      </span>
                      <span className="font-bold text-sm text-cyan-900 dark:text-cyan-200 leading-tight block truncate">{currentDevice.label}</span>
                    </div>
                    {currentAccessory && (
                      <div className="bg-purple-50/50 dark:bg-purple-900/10 backdrop-blur-md p-4 rounded-xl border border-purple-200/50 dark:border-purple-800/30 shadow-inner">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-purple-600 dark:text-purple-400 mb-0.5 uppercase tracking-wider">
                          <Headphones className="w-3.5 h-3.5" aria-hidden="true" />
                          אביזר נלווה
                        </span>
                        <span className="font-bold text-sm text-purple-900 dark:text-purple-200 leading-tight block truncate">{currentAccessory.label}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col pb-4 border-b border-slate-200 dark:border-white/20">
                    <div className="grid grid-cols-[1fr_auto] gap-4 items-center text-sm px-2 py-1.5">
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium">עלות מחירון מכשיר</span>
                      <span className="font-bold text-cyan-700 dark:text-cyan-300 text-left w-24">{deviceCost.toFixed(2)} ₪</span>
                    </div>
                    {currentAccessory && (
                      <div className="grid grid-cols-[1fr_auto] gap-4 items-center text-sm border-t border-slate-100 dark:border-slate-800 px-2 py-1.5">
                        <span className="text-purple-600 dark:text-purple-400 font-medium truncate">תוספת: {currentAccessory.label}</span>
                        <span className="font-black text-purple-700 dark:text-purple-300 text-left w-24"><span dir="ltr">+{accessoryCost.toFixed(2)}</span> ₪</span>
                      </div>
                    )}
                    {currentAccessory && (
                      <div className="grid grid-cols-[1fr_auto] gap-4 items-center text-sm border-t-2 border-slate-300 dark:border-slate-600 px-2 py-2 mt-1">
                        <span className="text-slate-800 dark:text-slate-200 font-black">סה״כ עלות (לפני סבסוד)</span>
                        <span className="font-black text-slate-900 dark:text-white text-left w-24">{totalCost.toFixed(2)} ₪</span>
                      </div>
                    )}
                    <div className="grid grid-cols-[1fr_auto] gap-4 items-center text-sm text-emerald-600 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-500/10 backdrop-blur-sm p-2 rounded-lg border border-emerald-200 dark:border-emerald-500/20 mt-2">
                      <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" aria-hidden="true" /> מימון ממשלתי</span>
                      <span className="font-black text-left w-24"><span dir="ltr">- {tierAllowance.toFixed(2)}</span> ₪</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <div className="text-xl text-slate-900 dark:text-white font-black">השתתפות אישית חודשית</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-2 font-medium">חיוב אמצעי התשלום של העובד (כולל מע&quot;מ)</div>
                    <div className={`text-5xl font-black tracking-tighter ${employeePayment === 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 drop-shadow-sm dark:drop-shadow-md'}`}>
                      {employeePayment.toFixed(2)} <span className={`text-2xl font-bold ml-1 ${employeePayment === 0 ? 'text-cyan-600 dark:text-cyan-200' : 'text-slate-500 dark:text-slate-400'}`}>₪</span>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-medium">* המחיר המוצג כולל מע&quot;מ</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-end pb-4 animate-in fade-in duration-500">

                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                  ממתין לנתונים<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">לסיכום העלויות</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs font-medium max-w-xs">בחרו דרגת זכאות ומסלול לקבלת שקלול מדויק של ההשתתפות העצמית.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorScreen;
