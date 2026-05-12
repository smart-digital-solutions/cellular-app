import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Calculator, BookOpen, HelpCircle, ChevronDown, Smartphone, ShieldAlert,
  Database, CheckCircle2, Info, Building, AlertCircle, CreditCard, Zap,
  Wrench, Phone, Globe2, Sparkles, GraduationCap, Plug, Megaphone, X, Clock, CalendarDays, Receipt
} from 'lucide-react';
import { useAppData } from './useAppData';
import heroImage from './assets/cellular-hero.jpg';


// ──────────────────────────────
//  Announcement Banner
// ──────────────────────────────
const AnnouncementBanner = ({ text, type = 'info', onClose }) => {
  const colors = {
    info: 'bg-indigo-600 text-white',
    warning: 'bg-amber-500 text-white',
    error: 'bg-red-600 text-white',
    success: 'bg-emerald-600 text-white',
  };
  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed top-0 left-0 right-0 z-[60] py-2.5 px-4 flex items-center justify-between gap-3 ${colors[type] || colors.info}`}
    >
      <div className="flex items-center gap-2 flex-1 justify-center">
        <Megaphone className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="text-sm font-bold">{text}</span>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="סגור הודעה"
        className="shrink-0 p-2 rounded-full hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
};

const normalizeTier = (s) => String(s || '').replace(/[\s,₪ש"ח]/g, '');
const checkTierMatch = (tier1, tier2) => {
  if (!tier1 || !tier2) return false;
  const n1 = normalizeTier(tier1);
  const n2 = normalizeTier(tier2);
  return n1 === n2 || n1.includes(n2) || n2.includes(n1);
};


const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = React.useId();
  return (
    <div className="group border border-slate-200/60 rounded-[1.5rem] mb-4 overflow-hidden bg-white/70 backdrop-blur-md omega-shadow hover:shadow-lg transition-all duration-300">
      <button
        className="w-full px-5 py-5 text-right flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
        id={`accordion-btn-${id}`}
      >
        <span className="font-bold text-slate-800 pe-2 text-base sm:text-lg group-hover:text-[#4F46E5] transition-colors">{question}</span>
        <div className={`p-2 rounded-full transition-all duration-300 shrink-0 ms-3 ${isOpen ? 'bg-[#4F46E5] text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
          <ChevronDown
            className="w-4 h-4"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
            aria-hidden="true"
          />
        </div>
      </button>
      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-btn-${id}`}
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="px-5 pb-5 pt-0 text-slate-600 leading-relaxed text-sm">
            <div className="h-px w-full bg-slate-200 mb-4"></div>{answer}
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────
//  Custom OmegaSelect Component
// ──────────────────────────────
const OmegaSelect = ({ value, onChange, options, placeholder, disabled, groups = false, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const listboxId = React.useId();

  const handleSetIsOpen = useCallback((val) => {
    setIsOpen(val);
    onOpenChange?.(val);
  }, [onOpenChange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleSetIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') handleSetIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSetIsOpen]);

  const selectedOption = groups 
    ? Object.values(options).flat().find(opt => opt.id === value)
    : options.find(opt => opt.id === value);

  return (
    <div
      className={`relative w-full ${disabled ? 'opacity-40 pointer-events-none' : ''} ${isOpen ? 'z-[1001]' : 'z-[1]'}`}
      ref={containerRef}
    >
      <button
        type="button"
        onClick={() => handleSetIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={selectedOption ? selectedOption.label : placeholder}
        className="w-full bg-white/80 backdrop-blur-md border-2 border-slate-200 py-4 px-5 rounded-[1.2rem] focus:ring-4 focus:ring-indigo-500/20 focus:border-[#4F46E5] font-bold text-base text-right flex justify-between items-center transition-all hover:border-indigo-300 cursor-pointer"
      >
        <span className={value ? 'text-slate-800' : 'text-slate-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className="w-5 h-5 text-slate-400 shrink-0"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={placeholder}
          className="absolute top-full left-0 right-0 mt-2 z-[999] premium-glass rounded-[1.5rem] border border-white/40 shadow-2xl animate-in fade-in duration-200 max-h-[260px] overflow-y-auto custom-scrollbar"
          style={{ animation: '0.25s cubic-bezier(0.34,1.56,0.64,1) both scale-in' }}
        >
          {groups ? (
            Object.entries(options).map(([category, items]) => (
              <div key={category} className="border-b border-slate-100 last:border-0">
                <div className="bg-slate-50/50 px-5 py-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest" role="presentation">{category}</div>
                {items.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    role="option"
                    aria-selected={opt.id === value}
                    onClick={() => { onChange({ target: { value: opt.id } }); handleSetIsOpen(false); }}
                    className={`w-full px-5 py-3.5 text-right flex justify-between items-center transition-colors group border-b border-slate-50 last:border-0 cursor-pointer ${opt.id === value ? 'bg-indigo-50' : 'hover:bg-indigo-50/70'}`}
                  >
                    <span className={`font-bold ${opt.id === value ? 'text-indigo-700' : 'text-slate-700 group-hover:text-indigo-700'}`}>{opt.label}</span>
                    {opt.totalCost > 0 && (
                      <span className="font-black text-slate-500 group-hover:text-indigo-600 bg-slate-100 px-2 py-1 rounded-lg text-xs" dir="ltr">
                        {opt.totalCost.toFixed(2)} ₪
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))
          ) : (
            options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="option"
                aria-selected={opt.id === value}
                onClick={() => { onChange({ target: { value: opt.id } }); handleSetIsOpen(false); }}
                className={`w-full px-5 py-4 text-right flex justify-between items-center transition-colors group border-b border-slate-50 last:border-0 cursor-pointer ${opt.id === value ? 'bg-indigo-50' : 'hover:bg-indigo-50/70'}`}
              >
                <span className={`font-bold ${opt.id === value ? 'text-indigo-700' : 'text-slate-700 group-hover:text-indigo-700'}`}>{opt.label}</span>
                {opt.allowance !== undefined && (
                  <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs" dir="ltr">
                    {opt.allowance.toFixed(2)} ₪
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const { tiers, devices, maintenance, faq, settings, catalog, catalogIsFallback, source } = useAppData();
  const [activeTab, setActiveTab] = useState('calculator');
  const [selectedTier, setSelectedTier] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  // יתרת ליסינג
  const [selectedTermDevice, setSelectedTermDevice] = useState('');
  const [activeStep, setActiveStep] = useState(null);
  const [selectedMaintDevice, setSelectedMaintDevice] = useState('');
  const [receiptDate, setReceiptDate] = useState('');

  // מזג קטלוג חיצוני + מכשירים מקומיים (BYOD/כשר/אביזרים)
  const allDevices = useMemo(() => {
    const localSpecial = devices.filter(d =>
      ['\u05deסלולים אישיים (BYOD)', '\u05deכשירים כשרים (\u05dcחצנים)', '\u05d0ביזרים'].includes(d.category)
    );
    return catalog && catalog.length > 0 ? [...localSpecial, ...catalog] : devices;
  }, [devices, catalog]);

  // חישובי מחשבון יתרת ליסינג
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
  const leaseEndDate = receiptDate ? new Date(new Date(receiptDate).setMonth(new Date(receiptDate).getMonth() + 24)) : null;
  const isLeaseExpired = monthsElapsed !== null && monthsElapsed >= 24;

  const showAnnouncement = settings.show_announcement === 'TRUE' && settings.announcement_text && !announcementDismissed;

  const handleTierChange = (val) => {
    setSelectedTier(val);
    const currentTier = tiers.find(t => t.id === val);
    if (currentTier?.restrictToSimOnly) {
      if (selectedDevice !== 'sim_only' && selectedDevice !== 'sim_only_repair' && selectedDevice !== '') {
        setSelectedDevice('');
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const currentTier = tiers.find(t => t.id === selectedTier);
  const currentDevice = allDevices.find(d => d.id === selectedDevice);
  const tierAllowance = currentTier?.allowance || 0;
  const totalCost = currentDevice?.totalCost || 0;
  const employeePayment = Math.max(0, totalCost - tierAllowance);

  const groupedDevices = allDevices.reduce((acc, device) => {
    if (!acc[device.category]) acc[device.category] = [];
    acc[device.category].push(device);
    return acc;
  }, {});

  const groupedCatalog = (catalog || []).reduce((acc, device) => {
    if (device.totalCost <= 0) return acc;
    if (!acc[device.category]) acc[device.category] = [];
    acc[device.category].push(device);
    return acc;
  }, {});

  const renderCalculator = () => (
    <div className="space-y-4 animate-omega-smooth relative z-10">
      <div className="premium-glass text-[#1E293B] text-sm p-4 rounded-[1.5rem] flex flex-col md:flex-row items-start md:items-center gap-4 border border-white/40 shadow-xl relative z-10 mb-1 transition-shadow duration-300 hover:shadow-2xl">
        <div className="bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] p-3 rounded-xl shadow-lg shrink-0 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-1 rounded-full bg-indigo-100/80 text-indigo-700 font-bold text-[10px] border border-indigo-200 w-max">
            הדור הבא של ניהול סלולר
          </div>
          <h3 className="font-black text-xl md:text-2xl mb-0.5 bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">ברוכים הבאים לסלולאטור</h3>
          <p className="leading-tight text-xs md:text-sm font-medium text-slate-500 max-w-3xl mb-2">
            הדרך החכמה והמדויקת ביותר למציאת המסלול המנצח במכרז הסלולר הממשלתי.<br />
            שקיפות בזכאות, עלויות ליסינג והשתתפות עצמית עבור עובדי המדינה.
          </p>
          <div className="bg-amber-50/80 border border-amber-200/50 rounded-lg p-2 flex items-center gap-2 animate-in slide-in-from-right duration-1000">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <p className="text-amber-900 text-[11px] font-bold leading-none">
              עלות הליסינג מתעדכנת בהתאם למחירי השוק
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10 items-start">
        <div className="flex flex-col gap-4 relative z-10">
          <section className={`premium-glass p-5 rounded-[1.5rem] omega-shadow border border-white/50 relative group flex flex-col transition-shadow duration-300 hover:shadow-2xl will-change-xform ${activeStep === 1 ? 'z-[60]' : 'z-10'}`}>
            <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-[#4F46E5] to-[#818CF8]"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-50 p-2.5 rounded-xl"><Building className="w-5 h-5 text-[#4F46E5]" /></div>
              <h2 className="text-lg font-black text-slate-800">שלב 1: דירוג זכאות</h2>
            </div>
            <OmegaSelect 
              value={selectedTier} 
              onChange={(e) => handleTierChange(e.target.value)} 
              options={tiers} 
              placeholder="-- בחר/י את הדרגה שלך --" 
              onOpenChange={(open) => open ? setActiveStep(1) : setActiveStep(null)}
            />
            {currentTier && (
              <div className="mt-3 bg-indigo-50/60 border border-indigo-100/60 rounded-[1rem] p-3 flex items-start gap-3 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-200 to-indigo-100"></div>
                <GraduationCap className="w-5 h-5 text-indigo-500 shrink-0" />
                <div>
                  <div className="font-bold text-[#4F46E5] text-xs mb-0.5">{currentTier.label}</div>
                  <div className="text-slate-600 font-medium text-xs leading-relaxed">{currentTier.desc}</div>
                </div>
              </div>
            )}
          </section>

          {selectedTier && (
            <div className={`animate-omega-spring relative ${activeStep === 2 ? 'z-[60]' : 'z-0'}`}>
              <section className={`premium-glass p-5 rounded-[1.5rem] omega-shadow border border-white/50 relative flex flex-col transition-shadow duration-300 hover:shadow-2xl will-change-xform`}>
                <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-[#06B6D4] to-[#38BDF8]"></div>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-cyan-50 p-2.5 rounded-xl"><Smartphone className="w-5 h-5 text-[#06B6D4]" /></div>
                      <h2 className="text-lg font-black text-slate-800">שלב 2: מכשיר / מסלול</h2>
                    </div>
                    {currentTier?.restrictToSimOnly && (<span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-1 rounded-lg font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> סים בלבד</span>)}
                </div>
                <OmegaSelect 
                  value={selectedDevice} 
                  onChange={(e) => setSelectedDevice(e.target.value)} 
                  options={groupedDevices} 
                  placeholder="-- בחר/י מסלול או מכשיר --"
                  disabled={!selectedTier}
                  groups={true}
                  onOpenChange={(open) => open ? setActiveStep(2) : setActiveStep(null)}
                />
                {currentDevice && (
                  <div className="mt-3 bg-cyan-50/60 border border-cyan-100/60 rounded-[1rem] p-3 flex items-start gap-3 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-200 to-cyan-100"></div>
                    <Info className="w-5 h-5 text-cyan-500 shrink-0" />
                    <div>
                      <div className="font-bold text-[#06B6D4] text-xs mb-0.5">{currentDevice.label}</div>
                      <div className="text-slate-600 font-medium text-xs leading-relaxed">העלות כוללת חבילת תקשורת ומע"מ (18%).</div>
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Receipt / Image */}
        <div className="relative rounded-[1.5rem] shadow-2xl border border-white/10 group min-h-[400px] lg:min-h-[500px] h-full flex flex-col sticky top-24 bg-[#0B1120] overflow-hidden">
          <img src={heroImage} alt="" role="presentation" width="800" height="1000" className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${selectedTier && selectedDevice ? 'opacity-20 scale-105 mix-blend-screen grayscale' : 'opacity-80 scale-100 hover:scale-105'}`} />
          <div className={`absolute inset-0 bg-gradient-to-t ${selectedTier && selectedDevice ? 'from-[#0B1120] via-[#0B1120]/80 to-transparent' : 'from-[#0B1120] via-transparent to-transparent'} pointer-events-none transition-colors duration-1000`}></div>

          <div className="relative z-10 flex flex-col h-full p-6 lg:p-8 pt-12 lg:pt-16">
            {selectedTier && selectedDevice && currentTier && currentDevice ? (
              <div className="animate-in fade-in zoom-in duration-500 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-emerald-500/20 p-2 rounded-full border border-emerald-500/30"><CheckCircle2 className="w-5 h-5 text-emerald-400" /></div>
                    <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">סיכום עלויות</h3>
                  </div>
                  <p className="text-slate-400 text-xs font-medium ms-10">משקלל השתתפות ומע"מ (18%)</p>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-inner group/card">
                      <span className="block text-[10px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider">דירוג</span>
                      <span className="font-bold text-sm text-white leading-tight">{currentTier.label}</span>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-inner group/card">
                      <span className="block text-[10px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider">מכשיר</span>
                      <span className="font-bold text-sm text-white leading-tight block truncate">{currentDevice.label}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pb-4 border-b border-white/20">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-300 font-medium">עלות מחירון</span>
                      <span className="font-bold text-white">{totalCost.toFixed(2)} ₪</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-emerald-300 font-bold bg-emerald-500/10 backdrop-blur-sm p-2 rounded-lg border border-emerald-500/20">
                      <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5"/> מימון ממשלתי</span>
                      <span dir="ltr" className="font-black">- {tierAllowance.toFixed(2)} ₪</span>
                    </div>
                  </div>
                  
                  <div className="pt-1">
                    <div className="text-xl text-white font-black">השתתפות אישית חודשית</div>
                    <div className="text-[10px] text-slate-400 mb-2 font-medium">חיוב בכרטיס האשראי (כולל מע"מ)</div>
                    <div className={`text-5xl font-black tracking-tighter ${employeePayment === 0 ? 'text-emerald-400' : 'text-white'}`}>
                      {employeePayment.toFixed(2)} <span className="text-2xl font-bold ml-1 text-slate-400">₪</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-end pb-4 animate-in fade-in duration-500">
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-[10px] mb-3 border border-white/20 w-max shadow-sm">
                  <Smartphone className="w-3.5 h-3.5 text-[#06B6D4]" /> נתוני 2026
                </div>
                <h3 className="text-3xl font-black text-white mb-2 leading-tight">
                  ממתין לנתונים<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">לסיכום העלויות</span>
                </h3>
                <p className="text-slate-400 text-xs font-medium max-w-xs">בחרו דרגת זכאות ומסלול לקבלת שקלול מדויק של ההשתתפות העצמית.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGuide = () => (
    <div className="space-y-8 animate-in fade-in duration-700 relative z-10 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-[#4F46E5] font-bold text-xs mb-4 border border-indigo-100"><Sparkles className="w-3.5 h-3.5" /> הדרכה רשמית</div>
        <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mb-4 tracking-tight">המדריך למכרז <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">2026</span></h2>
        <p className="text-base text-slate-500 font-medium">ריכזנו עבורך את כל המידע הקריטי מתוך תקציר השירותים הממשלתי. השוואת מסלולים, חוקי ברזל לשימוש והנחיות התקשרות.</p>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 premium-glass rounded-[2rem] border border-slate-200/60 p-6 flex flex-col transition-shadow duration-300 hover:shadow-2xl">
          <div className="bg-slate-100 w-12 h-12 rounded-xl flex items-center justify-center mb-5"><CreditCard className="w-6 h-6 text-slate-700" /></div>
          <h3 className="text-xl font-black text-slate-800 mb-5">SIM ONLY<br/><span className="text-slate-400 font-medium text-base">מסלול קו בלבד</span></h3>
          <ul className="space-y-4 flex-grow">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-1" /><span className="text-slate-600 font-medium text-sm">שירות קו בלבד ללא סים פיזי, ב-11.06 ₪.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-1" /><span className="text-slate-600 font-medium text-sm">ללא התחייבות לתקופה.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-1" /><span className="text-slate-600 font-medium text-sm">שירות תיקונים מקיף אופציונלי בתוספת 7.06 ₪.</span></li>
          </ul>
          {/* v1.5: SIM Only שמור לקבוצות לפי שיקול דעת המשרד (לא לאוכלוסייה ספציפית) */}
          <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-200"><span className="text-slate-700 font-bold text-xs">מוקצה לעובדים הזכאים רק לחבילת סלולר ללא מכשיר, בהתאם לשיקול דעת המשרד.<br/>סטודנטים ואזרחים ותיקים עודכנו למדרג מסד (88.50 ₪/חודש).</span></div>
        </div>
        <div className="lg:col-span-2 relative rounded-[2rem] bg-[#0B1120] p-6 sm:p-10 flex flex-col h-full">
          <div className="flex flex-col-reverse sm:flex-row justify-between items-start mb-6 gap-4">
            <div className="bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"><Smartphone className="w-6 h-6 text-white" /></div>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">המסלול המומלץ והמקיף ביותר</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">תוכנית ליסינג מלאה (24 חודשים)</h3>
          <p className="text-slate-400 font-medium mb-6 text-sm">המסלול מכיל מעטפת שירותים אבסולוטית לכל תקופת ההתקשרות:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 flex-grow">
            <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-emerald-500/20 shrink-0 mt-0.5"><Phone className="w-4 h-4 text-emerald-400" /></div><span className="text-slate-200 text-sm">7,500 דקות + 7,500 הודעות SMS</span></li>
            <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-emerald-500/20 shrink-0 mt-0.5"><Globe2 className="w-4 h-4 text-emerald-400" /></div><span className="text-slate-200 text-sm">נפח גלישה עצום בארץ: <strong>1 טרה-בייט (1TB)</strong></span></li>
            <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-indigo-500/20 shrink-0 mt-0.5"><Plug className="w-4 h-4 text-indigo-400" /></div><span className="text-slate-200 text-sm">המכשיר מסופק עם <strong>מטען קיר מתנה</strong></span></li>
            <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-cyan-500/20 shrink-0 mt-0.5"><Globe2 className="w-4 h-4 text-cyan-400" /></div><span className="text-slate-200 text-sm">חבילת חו"ל מובנית (10GB + 50 דק')</span></li>
            <li className="flex items-start gap-3"><div className="p-1.5 rounded-full bg-blue-500/20 shrink-0 mt-0.5"><Wrench className="w-4 h-4 text-blue-400" /></div><span className="text-slate-200 text-sm">שירות תיקונים מקיף לכל 24 החודשים</span></li>
            <li className="flex items-start gap-3 sm:col-span-2 mt-2"><div className="p-1.5 rounded-full bg-pink-500/20 shrink-0 mt-0.5"><ShieldAlert className="w-4 h-4 text-pink-400" /></div><span className="text-white font-bold text-sm">חובה: מופעל צימוד סים (SIM Pairing) טכנולוגי - קו נעול למכשיר.</span></li>
          </div>
        </div>
      </section>
      <section className="relative rounded-[2rem] overflow-hidden shadow-xl bg-white border border-red-100 p-6 sm:p-10">
        <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3"><div className="bg-red-50 p-2 rounded-xl"><ShieldAlert className="w-6 h-6 text-red-500" /></div>הנחיות חובה לפני המעבר</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4"><div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-slate-600" /></div><div><h4 className="font-black text-lg text-slate-800">14 יום להחזרת ציוד ישן</h4><p className="text-slate-600 text-sm">יש לכם בדיוק 14 ימי עסקים להחזיר את מכשיר הליסינג הישן לפלאפון. איחור יגרור קנס וחיוב מלא בשווי המכשיר!</p></div></div>
          <div className="flex gap-4"><div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0"><Database className="w-5 h-5 text-slate-600" /></div><div><h4 className="font-black text-lg text-slate-800">אחריות גיבוי נתונים</h4><p className="text-slate-600 text-sm">חובה עליכם לגבות עצמאית את כל התמונות, אנשי הקשר וה-WhatsApp לענן טרם שדרוג המכשיר והחזרתו.</p></div></div>
        </div>
      </section>

      {/* v1.5: סעיף חו"ל חדש */}
      <section className="relative rounded-[2rem] overflow-hidden shadow-xl bg-[#0B1120] border border-cyan-900/30 p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold text-xs mb-5 border border-cyan-500/20"><Globe2 className="w-3.5 h-3.5" /> עדכון גרסה 1.5 — שירותי חו"ל</div>
        <h3 className="text-2xl font-black text-white mb-6">חבילות Roaming — ארכיטקטורה חדשה</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 w-fit mb-3"><Globe2 className="w-5 h-5 text-cyan-400" /></div>
            <h4 className="font-black text-white text-sm mb-2">חבילות גלישה גמישות</h4>
            <p className="text-slate-400 text-xs leading-relaxed">חבילות גלישה בסיסיות: 5GB ב-5 ₪, 20GB ב-13 ₪. ללא הגבלת ימי תוקף.</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 w-fit mb-3"><Zap className="w-5 h-5 text-emerald-400" /></div>
            <h4 className="font-black text-white text-sm mb-2">Zero-Rating באפליקציות שירות</h4>
            <p className="text-slate-400 text-xs leading-relaxed">WhatsApp, Facebook, Instagram, Waze, Google Maps — הגלישה <strong className="text-white">אינה יורדת</strong> מנפח החבילה.</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
            <div className="p-2.5 rounded-xl bg-red-500/20 w-fit mb-3"><ShieldAlert className="w-5 h-5 text-red-400" /></div>
            <h4 className="font-black text-white text-sm mb-2">חסימה אוטומטית (Hard Stop)</h4>
            <p className="text-slate-400 text-xs leading-relaxed">בסיום נפח גלישת חו"ל — הגלישה נחסמת אוטומטית. לא תצברו חיובים נסתרים.</p>
          </div>
        </div>
      </section>

      {/* v1.5: עדכון תנאי BYOD */}
      <section className="relative rounded-[2rem] overflow-hidden shadow-xl bg-white border border-amber-200 p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 font-bold text-xs mb-5 border border-amber-200"><AlertCircle className="w-3.5 h-3.5" /> עדכון גרסה 1.5 — BYOD</div>
        <h3 className="text-2xl font-black text-slate-800 mb-4">צירוף מכשיר פרטי (BYOD)</h3>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-0">
          <p className="text-amber-900 font-bold text-sm">⚠️ תנאי הביטוח הוחמר: רק מכשירים <strong>מהדגמים המאושרים במכרז</strong> זכאים לביטוח. מכשיר "נתמך ע"י הספק" אינו מספיק עוד. יש לוודא שהדגם מופיע ברשימת הדגמים המאושרים לפני הגשת בקשה.</p>
        </div>
      </section>
    </div>
  );

  const renderMaintenance = () => (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto relative z-10">
      <div className="relative rounded-[2rem] bg-[#0B1120] text-white p-6 sm:p-10">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white font-bold text-xs mb-4"><Wrench className="w-3.5 h-3.5" /> שקיפות מלאה</div>
          <h2 className="text-3xl font-black mb-4">מחירון תחזוקה והשתתפות בנזקים</h2>
          <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-3xl">מסלול הליסינג כולל שירות תיקונים. במקרי קיצון של אובדן/גניבה/השבתה, קיימת השתתפות עצמית לפי מחירון המכרז (כולל מע"מ 18%).</p>
          
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

      <div className="bg-white border border-slate-200/80 rounded-[1.5rem] shadow-xl overflow-hidden">
        <div className="overflow-x-auto pb-2">
          <table className="w-full text-right border-collapse min-w-[800px]" id="maintenance-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-black text-slate-800 text-base">מחירון משוקלל</th>
                <th className="p-4 border-r border-slate-200"><div className="text-xs text-slate-500 font-bold mb-1">שבר מסך</div><div className="font-black text-[#4F46E5] text-sm">פעם ראשונה</div></th>
                <th className="p-4 border-r border-slate-200"><div className="text-xs text-slate-500 font-bold mb-1">שבר מסך</div><div className="font-black text-[#4F46E5] text-sm">פעם שנייה+</div></th>
                <th className="p-4 border-r border-slate-200 bg-red-50/50"><div className="text-xs text-red-500 font-bold mb-1">אובדן/גניבה</div><div className="font-black text-red-700 text-sm">פעם ראשונה</div></th>
                <th className="p-4 border-r border-slate-200 bg-amber-50/50"><div className="text-xs text-amber-600 font-bold mb-1">השבתה (טוטאלוס)</div><div className="font-black text-amber-700 text-sm">פעם ראשונה</div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {maintenance.map((row, idx) => {
                const isHighlighted = selectedMaintDevice && (() => {
                  const device = catalog?.find(d => d.id === selectedMaintDevice);
                  return device && checkTierMatch(row.tier, device.maintenanceTier);
                })();

                return (
                  <tr key={idx} className={`transition-all duration-300 ${isHighlighted ? 'bg-cyan-50 z-10 relative shadow-[0_4px_20px_rgba(6,182,212,0.2)]' : 'hover:bg-slate-50 hover:shadow-sm'}`}>
                    <td className={`p-4 font-black text-sm border-y-2 border-r-2 ${isHighlighted ? 'text-cyan-800 border-cyan-400 rounded-r-xl' : 'text-slate-800 bg-slate-50/30 border-y-transparent border-r-transparent'}`}>{row.tier}</td>
                    <td className={`p-4 font-bold border-r text-sm border-y-2 ${isHighlighted ? 'text-cyan-900 border-y-cyan-400 border-r-cyan-400/30' : 'border-slate-100 text-slate-600 border-y-transparent'}`}>{row.screen1}</td>
                    <td className={`p-4 font-bold border-r text-sm border-y-2 ${isHighlighted ? 'text-cyan-900 border-y-cyan-400 border-r-cyan-400/30' : 'border-slate-100 text-slate-600 border-y-transparent'}`}>{row.screen2}</td>
                    <td className={`p-4 font-black border-r text-sm border-y-2 ${isHighlighted ? 'text-cyan-900 border-y-cyan-400 border-r-cyan-400/30' : 'bg-red-50/20 text-red-600 border-y-transparent border-r-slate-100'}`}>{row.theft1}</td>
                    <td className={`p-4 font-black border-r border-l-2 text-sm border-y-2 ${isHighlighted ? 'text-cyan-900 border-y-cyan-400 border-r-cyan-400/30 border-l-cyan-400 rounded-l-xl' : 'bg-amber-50/20 text-amber-600 border-y-transparent border-r-slate-100 border-l-transparent'}`}>{row.disable1}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTermination = () => (
    <div className={`animate-in fade-in max-w-4xl mx-auto relative ${activeStep === 3 ? 'z-50' : 'z-10'}`}>
      <div className="text-center mb-10 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-[#4F46E5] font-bold text-xs mb-4 border border-indigo-100">
          <Receipt className="w-3.5 h-3.5" /> מחשבון סיום מוקדם
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-3">יתרת ליסינג <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">וקנסות</span></h2>
        <p className="text-slate-500 text-sm font-medium max-w-xl mx-auto">
          סיום התקשרות לפני תום 24 חודשים דורש תשלום קנס בגין החודשים שנותרו, או לחילופין רכישת המכשיר בעלות מופחתת מראש.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-6">
          <div className={`bg-white border border-slate-200/80 rounded-[1.5rem] p-6 shadow-xl relative overflow-visible ${activeStep === 3 ? 'z-50' : 'z-10'}`}>
            <div className="absolute top-0 right-0 w-2 h-full bg-[#4F46E5]"></div>
            <h3 className="font-black text-xl text-slate-800 mb-5 flex items-center gap-2"><Smartphone className="w-5 h-5 text-[#4F46E5]"/> בחירת מכשיר ליסינג</h3>
            <div className="relative">
              <OmegaSelect 
                value={selectedTermDevice} 
                onChange={(e) => setSelectedTermDevice(e.target.value)} 
                options={groupedCatalog} 
                placeholder="-- בחר/י מכשיר מתוך הקטלוג --"
                groups={true}
                onOpenChange={(open) => open ? setActiveStep(3) : setActiveStep(null)}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-[1.5rem] p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-[#06B6D4]"></div>
            <h3 className="font-black text-xl text-slate-800 mb-5 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-[#06B6D4]"/> מתי קיבלת את המכשיר?</h3>
            <div className="relative">
              <input type="month" value={receiptDate} onChange={(e) => setReceiptDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-base rounded-2xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 block p-4 pr-11 font-bold transition-all" />
              <CalendarDays className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {monthsElapsed !== null && (
              <div className="mt-4 flex items-center justify-between text-sm font-bold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span>חודשים שעברו: <span className="text-slate-800">{monthsElapsed} מתוך 24</span></span>
                {leaseEndDate && <span>סיום רשמי: <span className="text-slate-800">{leaseEndDate.toLocaleDateString('he-IL', { month: '2-digit', year: 'numeric'})}</span></span>}
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#0B1120] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden text-white border border-white/10 sticky top-28">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#4F46E5]/10 to-[#06B6D4]/10 pointer-events-none"></div>
          
          <div className="flex flex-col gap-4 mb-6">
            <h3 className="text-xl font-black flex items-center gap-2"><Receipt className="w-5 h-5 text-[#06B6D4]"/> סיכום לתשלום</h3>
            
            {catalogIsFallback && (
              <div className="bg-amber-500/20 border border-amber-500/40 rounded-xl p-3 flex items-start gap-2 text-amber-200">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
                <div className="text-sm">
                  <span className="font-bold block mb-1">שימו לב: סכום משוערך בלבד</span>
                  הנתונים נשאבים כעת מגיליון הגיבוי מאחר והקובץ הממשלתי הרשמי אינו זמין. יש לבדוק ולאמת את הסכומים מול אמרכלות המשרד לפני ביצוע כל רכישה או התנתקות.
                </div>
              </div>
            )}
          </div>
          
          {!termDevice || !receiptDate ? (
            <div className="text-center py-10 opacity-50">
              <Calculator className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-bold">בחר מכשיר ותאריך קבלה לחישוב הקנס</p>
            </div>
          ) : isLeaseExpired ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30"><CheckCircle2 className="w-8 h-8"/></div>
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
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 relative overflow-hidden mb-4">
                  <div className="text-red-400 text-xs font-bold mb-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> תשלום לסיום התקשרות והחזרת המכשיר</div>
                  <div className="text-3xl font-black text-white">{terminationPenalty.toFixed(2)} <span className="text-lg text-red-300">₪</span></div>
                </div>

                <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-4 relative overflow-hidden mb-4">
                   <div className="text-indigo-400 text-xs font-bold mb-1 flex items-center gap-1"><Smartphone className="w-3 h-3"/> עלות רכישת מכשיר בסוף תקופה</div>
                   <div className="text-xl font-black text-white">{termDevice.buyoutPrice.toFixed(2)} <span className="text-sm text-indigo-300">₪</span></div>
                </div>

                {(() => {
                  const termMaintenance = maintenance.find(m => 
                    checkTierMatch(m.tier, termDevice.maintenanceTier)
                  );
                  
                  if (!termMaintenance) return null;

                  return (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 mt-6 shadow-inner backdrop-blur-sm">
                      <div className="text-cyan-400 text-xs font-black mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Wrench className="w-4 h-4" /> מחירון תחזוקה והשתתפות בנזקים
                        <span className="bg-cyan-500/20 px-2 py-0.5 rounded text-[10px] border border-cyan-500/30">{termDevice.maintenanceTier}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: 'תיקון מסך (פעם 1)', val: termMaintenance.screen1 },
                          { label: 'תיקון מסך (פעם 2)', val: termMaintenance.screen2 },
                          { label: 'אובדן/גניבה', val: termMaintenance.theft1 },
                          { label: 'השבתה מלאה', val: termMaintenance.disable1 }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-[#0B1120] border border-white/5 p-3 rounded-xl">
                            <div className="text-[10px] text-slate-500 font-bold mb-1">{item.label}</div>
                            <div className="text-sm font-black text-white">{item.val} ₪</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-right bg-slate-50 relative flex flex-col mesh-gradient-bg" dir="rtl">
      {showAnnouncement && (
        <AnnouncementBanner
          text={settings.announcement_text}
          type={settings.announcement_type || 'info'}
          onClose={() => setAnnouncementDismissed(true)}
        />
      )}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <header
        className="fixed left-0 right-0 z-50 px-3 py-2"
        style={{ top: showAnnouncement ? '44px' : '0', transition: 'top 0.3s cubic-bezier(0.4,0,0.2,1)' }}
        role="banner"
      >
        <div className="max-w-6xl mx-auto bg-[rgba(15,23,42,0.85)] backdrop-blur-xl rounded-[1rem] md:rounded-full border border-white/10 shadow-2xl flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-full flex items-center justify-center text-white" aria-hidden="true"><Smartphone className="w-4 h-4" /></div>
            <span className="font-black text-base text-white" aria-label="סלולאטור 2026">סלולאטור <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">2026</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="ניווט ראשי">
            {[{ id: 'calculator', icon: Calculator, label: 'מחשבון עלויות' }, { id: 'termination', icon: Receipt, label: 'מחשבון סיום ליסינג' }, { id: 'maintenance', icon: Wrench, label: 'מחירון נזקים' }, { id: 'guide', icon: BookOpen, label: 'מדריך והנחיות' }, { id: 'faq', icon: HelpCircle, label: 'שאלות ותשובות' }].map(tab => (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id ? 'page' : undefined}
                aria-label={tab.label}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-white text-[#0B1120] scale-105 glow-active' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#4F46E5]' : ''}`} aria-hidden="true" />{tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <div className={`transition-all duration-300 ${showAnnouncement ? 'pt-28 md:pt-32' : 'pt-16 md:pt-20'}`} />

      <main id="main-content" className="max-w-6xl mx-auto px-4 relative z-40 pb-nav-safe flex-grow w-full" role="main">
        {activeTab === 'calculator' && renderCalculator()}
        {activeTab === 'termination' && renderTermination()}
        {activeTab === 'guide' && renderGuide()}
        {activeTab === 'maintenance' && renderMaintenance()}
        {activeTab === 'faq' && (
          <div className="animate-in fade-in max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-10 pt-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-[#4F46E5] font-bold text-xs mb-4 border border-indigo-100"><Megaphone className="w-3.5 h-3.5" /> עדכונים רגולטוריים</div>
              <h2 className="text-4xl font-black text-slate-800 mb-3">הודעות <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">התכ"ם</span></h2>
              <p className="text-slate-500 text-sm font-medium max-w-xl mx-auto">הוראות תכ"ם הן מקור האמת הרגולטורי הרשמי. לכל שאלה פרטנית — יש לעיין בהוראה הרלוונטית באתר החשכ"ל.</p>
            </div>
            <div className="space-y-4">{faq.map((item, idx) => <AccordionItem key={idx} question={item.question} answer={item.answer} />)}</div>
            <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-[1.5rem] p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-black text-indigo-700 text-sm mb-1">קישור ישיר לאתר החשכ"ל</div>
                <a href="https://takam.mof.gov.il/document/HM.16.7.1" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold text-sm underline hover:text-indigo-800 transition-colors">לחץ כאן לכלל הוראות תכ"ם 16.7.1 →</a>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="mt-auto bg-white/50 backdrop-blur-lg border-t border-slate-200/60 py-6 relative z-10 pb-24 md:pb-8" role="contentinfo">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-right">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4F46E5]" />
              <span className="font-black text-slate-800 text-sm">{settings.app_title}</span>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-indigo-200">v1.5</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                עודכן ב: {typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : new Date().toLocaleDateString('he-IL')}
              </div>
              <div className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border ${source === 'sheets' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                {source === 'sheets' ? 'LIVE' : 'OFFLINE'}
              </div>
            </div>
          </div>
          <div className="text-sm font-medium text-slate-500 flex items-center gap-1">אופיין ופותח ע״י <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">דינה שרון</span> | משרד התקשורת</div>
        </div>
      </footer>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[rgba(15,23,42,0.9)] backdrop-blur-xl border-t border-white/10 px-2 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-2 z-50" role="navigation" aria-label="ניווט תחתון">
        <div className="flex justify-between">
          {[{ id: 'calculator', icon: Calculator, label: 'עלויות' }, { id: 'termination', icon: Receipt, label: 'סיום ליסינג' }, { id: 'maintenance', icon: Wrench, label: 'נזקים' }, { id: 'guide', icon: BookOpen, label: 'מדריך' }, { id: 'faq', icon: HelpCircle, label: 'שאלות' }].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              aria-label={tab.label}
              className={`flex-1 flex flex-col items-center justify-center gap-1 min-h-[52px] transition-colors ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}
            >
              <div className={`p-2 rounded-xl transition-all duration-200 ${activeTab === tab.id ? 'bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] shadow-lg' : ''}`}>
                <tab.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-[10px] font-bold">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
      {/* Fonts loaded via <link> in index.html for performance and CSP compliance */}
    </div>
  );
}
