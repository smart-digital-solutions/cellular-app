import React, { useState, useEffect } from 'react';
import {
  Calculator, BookOpen, HelpCircle, ChevronDown, Smartphone, ShieldAlert,
  Database, CheckCircle2, Info, Building, AlertCircle, CreditCard, Zap,
  Wrench, Phone, Globe2, Sparkles, GraduationCap, Plug, RefreshCw, Megaphone, X, Clock
} from 'lucide-react';
import { useAppData } from './useAppData';
import heroImage from './assets/cellular-hero.jpg';

// ──────────────────────────────
//  Loading Screen Component
// ──────────────────────────────
const LoadingScreen = () => (
  <div className="fixed inset-0 z-[100] bg-[#0B1120] flex flex-col items-center justify-center gap-6">
    <div className="relative">
      <div className="w-20 h-20 rounded-full border-4 border-white/10 border-t-[#4F46E5] animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Smartphone className="w-8 h-8 text-[#4F46E5]" />
      </div>
    </div>
    <div className="text-center">
      <p className="text-white font-black text-xl mb-1">טוען נתונים עדכניים...</p>
      <p className="text-slate-400 text-sm">מתחבר למאגר הנתונים</p>
    </div>
  </div>
);

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
    <div className={`fixed top-0 left-0 right-0 z-[60] py-2.5 px-4 flex items-center justify-between gap-3 ${colors[type] || colors.info}`}>
      <div className="flex items-center gap-2 flex-1 justify-center">
        <Megaphone className="w-4 h-4 shrink-0" />
        <span className="text-sm font-bold">{text}</span>
      </div>
      <button onClick={onClose} className="shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const DEVICES_CATALOG_PLACEHOLDER = [
  { id: 'sim_only', label: 'מסלול ללא מכשיר (SIM Only)', category: 'מסלולים אישיים (BYOD)', totalCost: 11.06 },
  { id: 'sim_only_repair', label: 'מסלול SIM Only + שירות תיקונים', category: 'מסלולים אישיים (BYOD)', totalCost: 18.12 },
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="group border border-slate-200/60 rounded-[1.5rem] mb-4 overflow-hidden bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-500">
      <button className="w-full px-5 py-5 text-right flex justify-between items-center focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        <span className="font-bold text-slate-800 pr-2 text-base sm:text-lg group-hover:text-[#4F46E5] transition-colors">{question}</span>
        <div className={`p-2 rounded-full transition-all duration-500 shrink-0 mr-3 ${isOpen ? 'bg-[#4F46E5] text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-5 pt-0 text-slate-600 leading-relaxed text-sm">
          <div className="h-px w-full bg-slate-200 mb-4"></div>{answer}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const { tiers, devices, maintenance, faq, settings, loading, source, refresh } = useAppData();
  const [activeTab, setActiveTab] = useState('calculator');
  const [selectedTier, setSelectedTier] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const showAnnouncement = settings.show_announcement === 'TRUE' && settings.announcement_text && !announcementDismissed;

  useEffect(() => {
    const currentTier = tiers.find(t => t.id === selectedTier);
    if (currentTier?.restrictToSimOnly) {
      if (selectedDevice !== 'sim_only' && selectedDevice !== 'sim_only_repair' && selectedDevice !== '') {
        setSelectedDevice('');
      }
    }
  }, [selectedTier, selectedDevice, tiers]);
  // if (loading) return <LoadingScreen />; // הוסר כדי לאפשר טעינה ברקע (SWR)
  const currentTier = tiers.find(t => t.id === selectedTier);
  const currentDevice = devices.find(d => d.id === selectedDevice);

  const tierAllowance = currentTier?.allowance || 0;
  const totalCost = currentDevice?.totalCost || 0;
  const employeePayment = Math.max(0, totalCost - tierAllowance);

  const groupedDevices = devices.reduce((acc, device) => {
    if (!acc[device.category]) acc[device.category] = [];
    acc[device.category].push(device);
    return acc;
  }, {});

  const renderCalculator = () => (
    <div className="space-y-6 animate-in fade-in duration-700 relative z-10">
      <div className="glass-panel text-[#1E293B] text-sm p-6 rounded-[1.5rem] flex flex-col md:flex-row items-start md:items-center gap-5 border border-white/40 shadow-xl relative z-10 mb-2">
        <div className="bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] p-4 rounded-2xl shadow-lg shrink-0 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full bg-indigo-100/80 text-indigo-700 font-bold text-xs border border-indigo-200 w-max">
            הדור הבא של ניהול סלולר
          </div>
          <h3 className="font-black text-2xl md:text-3xl mb-1 bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">ברוכים הבאים לסלולטור</h3>
          <p className="leading-relaxed text-sm md:text-base font-medium text-slate-600 max-w-3xl">הסימולטור החכם שיעזור לכם לבחור את המסלול המשתלם ביותר, בשקיפות מלאה. משקלל השתתפות ממשלתית, ליסינג ומע"מ (18%).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10 items-start">
        <div className="flex flex-col gap-6">
          <section className="glass-panel p-6 rounded-[1.5rem] shadow-lg border border-white/50 relative overflow-hidden group flex flex-col">
            <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-[#4F46E5] to-[#818CF8]"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-50 p-3 rounded-xl"><Building className="w-6 h-6 text-[#4F46E5]" /></div>
              <h2 className="text-xl font-black text-slate-800">שלב 1: דירוג זכאות</h2>
            </div>
            <select value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)} className="w-full bg-slate-50/80 border-2 border-slate-200 py-4 px-4 rounded-[1.2rem] focus:ring-4 focus:ring-indigo-500/20 focus:border-[#4F46E5] font-bold text-base cursor-pointer">
              <option value="" disabled>-- בחר/י את הדרגה שלך --</option>
              {tiers.map(tier => (<option key={tier.id} value={tier.id}>{tier.label} - תקרת השתתפות: {tier.allowance.toFixed(2)} ₪</option>))}
            </select>
            {currentTier && (
              <div className="mt-5 bg-indigo-50/60 border border-indigo-100/60 rounded-[1.2rem] p-4 flex items-start gap-3 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-200 to-indigo-100"></div>
                <GraduationCap className="w-6 h-6 text-indigo-500 shrink-0" />
                <div>
                  <div className="font-bold text-[#4F46E5] text-sm mb-1">{currentTier.label} - למי מיועד?</div>
                  <div className="text-slate-700 font-medium text-sm leading-relaxed">{currentTier.desc}</div>
                </div>
              </div>
            )}
          </section>

          <section className={`glass-panel p-6 rounded-[1.5rem] shadow-lg border border-white/50 relative overflow-hidden flex flex-col ${!selectedTier ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
            <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-[#06B6D4] to-[#38BDF8]"></div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-50 p-3 rounded-xl"><Smartphone className="w-6 h-6 text-[#06B6D4]" /></div>
                <h2 className="text-xl font-black text-slate-800">שלב 2: מכשיר / מסלול</h2>
              </div>
              {currentTier?.restrictToSimOnly && (<span className="bg-amber-100 text-amber-800 text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> זכאות לסים בלבד</span>)}
            </div>
            <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)} disabled={!selectedTier} className="w-full bg-slate-50/80 border-2 border-slate-200 py-4 px-4 rounded-[1.2rem] focus:ring-4 focus:ring-cyan-500/20 focus:border-[#06B6D4] font-bold text-base disabled:opacity-50 cursor-pointer">
              <option value="" disabled>-- בחר/י מסלול או מכשיר --</option>
              {Object.entries(groupedDevices).map(([category, devices]) => (
                <optgroup label={category} key={category} className="font-black text-[#4F46E5] bg-slate-100/80">
                  {devices.map(device => {
                    const isDisabled = currentTier?.restrictToSimOnly && device.id !== 'sim_only' && device.id !== 'sim_only_repair';
                    return (<option key={device.id} value={device.id} disabled={isDisabled} className="text-slate-800 font-bold bg-white text-base">{device.label} {isDisabled ? '(לא זמין)' : `- ${device.totalCost.toFixed(2)} ₪`}</option>);
                  })}
                </optgroup>
              ))}
            </select>
            {currentDevice && (
              <div className="mt-5 bg-cyan-50/60 border border-cyan-100/60 rounded-[1.2rem] p-4 flex items-start gap-3 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-200 to-cyan-100"></div>
                <Info className="w-6 h-6 text-cyan-500 shrink-0" />
                <div>
                  <div className="font-bold text-[#06B6D4] text-sm mb-1">{currentDevice.label}</div>
                  <div className="text-slate-700 font-medium text-sm">העלות המוצגת כוללת את חבילת התקשורת, נפח הגלישה ושירות התיקונים המלא. <strong>המחיר כולל מע"מ (18%).</strong></div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* LEFT COLUMN: Receipt / Image */}
        <div className="relative rounded-[1.5rem] shadow-2xl border border-white/10 group min-h-[500px] h-full flex flex-col sticky top-28 bg-[#0B1120] overflow-hidden">
          <img src={heroImage} alt="סלולטור" className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${selectedTier && selectedDevice ? 'opacity-20 scale-105 mix-blend-screen grayscale' : 'opacity-80 scale-100 hover:scale-105'}`} />
          <div className={`absolute inset-0 bg-gradient-to-t ${selectedTier && selectedDevice ? 'from-[#0B1120] via-[#0B1120]/80 to-transparent' : 'from-[#0B1120] via-transparent to-transparent'} pointer-events-none transition-colors duration-1000`}></div>

          <div className="relative z-10 flex flex-col h-full p-6 lg:p-8">
            {selectedTier && selectedDevice && currentTier && currentDevice ? (
              <div className="animate-in fade-in zoom-in duration-500 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-emerald-500/20 p-2 rounded-full border border-emerald-500/30"><CheckCircle2 className="w-6 h-6 text-emerald-400" /></div>
                    <h3 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 drop-shadow-sm">סיכום עלויות אישי</h3>
                  </div>
                  <p className="text-slate-300 text-sm font-medium mr-12 drop-shadow-md">משקלל השתתפות משרד ומע"מ נוכחי (18%)</p>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-inner">
                      <span className="block text-xs font-bold text-slate-300 mb-1 uppercase drop-shadow-sm">דירוג השתתפות</span>
                      <span className="font-black text-lg text-white leading-tight drop-shadow-sm">{currentTier.label}</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-inner">
                      <span className="block text-xs font-bold text-slate-300 mb-1 uppercase drop-shadow-sm">מכשיר נבחר</span>
                      <span className="font-black text-lg text-white leading-tight block truncate drop-shadow-sm">{currentDevice.label}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pb-6 border-b border-white/20">
                    <div className="flex justify-between items-center text-base drop-shadow-sm">
                      <span className="text-slate-200 font-medium">עלות מחירון</span>
                      <span className="font-bold text-white">{totalCost.toFixed(2)} ₪</span>
                    </div>
                    <div className="flex justify-between items-center text-base text-emerald-300 font-bold bg-emerald-500/20 backdrop-blur-sm p-3 rounded-xl border border-emerald-500/30 shadow-sm">
                      <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> מימון ממשלתי</span>
                      <span dir="ltr" className="font-black">- {tierAllowance.toFixed(2)} ₪</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-2xl text-white font-black drop-shadow-md">השתתפות אישית חודשית</div>
                    <div className="text-sm text-slate-300 mt-1 mb-4 font-medium drop-shadow-md">חיוב בכרטיס האשראי (כולל מע"מ)</div>
                    <div className={`text-6xl font-black tracking-tighter drop-shadow-2xl ${employeePayment === 0 ? 'text-emerald-400' : 'bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300'}`}>
                      {employeePayment.toFixed(2)} <span className="text-3xl font-bold ml-1 text-slate-400">₪</span>
                    </div>
                    {employeePayment === 0 && (
                      <div className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-black px-4 py-2 rounded-lg shadow-lg inline-flex items-center gap-2">
                        <Zap className="w-4 h-4 fill-white" /> מימון מלא! ללא עלות מצידך.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-end pb-4 animate-in fade-in duration-500">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-xs mb-4 border border-white/20 w-max shadow-sm">
                  <Smartphone className="w-4 h-4 text-[#06B6D4]" /> מתממשק לנתוני 2026
                </div>
                <h3 className="text-4xl font-black text-white mb-3 leading-tight drop-shadow-2xl">
                  ממתין לנתונים<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">לסיכום העלויות</span>
                </h3>
                <p className="text-slate-300 font-medium drop-shadow-md max-w-sm">בחרו דרגת זכאות מסעיף 1 ומסלול מסעיף 2 כדי לקבל שקלול מדויק של ההשתתפות העצמית לחיוב באשראי.</p>
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
        <div className="lg:col-span-1 glass-panel rounded-[2rem] border border-slate-200/60 p-6 flex flex-col">
          <div className="bg-slate-100 w-12 h-12 rounded-xl flex items-center justify-center mb-5"><CreditCard className="w-6 h-6 text-slate-700" /></div>
          <h3 className="text-xl font-black text-slate-800 mb-5">SIM ONLY<br /><span className="text-slate-400 font-medium text-base">מסלול קו בלבד</span></h3>
          <ul className="space-y-4 flex-grow">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-1" /><span className="text-slate-600 font-medium text-sm">שירות קו בלבד ללא סים פיזי, ב-11.06 ₪.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-1" /><span className="text-slate-600 font-medium text-sm">ללא התחייבות לתקופה.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-1" /><span className="text-slate-600 font-medium text-sm">שירות תיקונים מקיף אופציונלי בתוספת 7.06 ₪.</span></li>
          </ul>
          <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-200"><span className="text-slate-700 font-bold text-xs">סטודנטים ואזרחים ותיקים משויכים למסלול זה.</span></div>
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
    </div>
  );

  const renderMaintenance = () => (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto relative z-10">
      <div className="relative rounded-[2rem] bg-[#0B1120] text-white p-6 sm:p-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white font-bold text-xs mb-4"><Wrench className="w-3.5 h-3.5" /> שקיפות מלאה</div>
        <h2 className="text-3xl font-black mb-4">מחירון תחזוקה והשתתפות בנזקים</h2>
        <p className="text-slate-300 text-base leading-relaxed">מסלול הליסינג כולל שירות תיקונים. במקרי קיצון של אובדן/גניבה/השבתה, קיימת השתתפות עצמית לפי מחירון המכרז (כולל מע"מ 18%).</p>
      </div>
      <div className="bg-white border border-slate-200/80 rounded-[1.5rem] shadow-xl overflow-hidden">
        <div className="overflow-x-auto pb-2">
          <table className="w-full text-right border-collapse min-w-[800px]">
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
              {maintenance.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-4 font-black text-slate-800 bg-slate-50/30 text-sm">{row.tier}</td>
                  <td className="p-4 font-bold text-slate-600 border-r border-slate-100 text-sm">{row.screen1}</td>
                  <td className="p-4 font-bold text-slate-600 border-r border-slate-100 text-sm">{row.screen2}</td>
                  <td className="p-4 font-black text-red-600 border-r border-slate-100 bg-red-50/20 text-sm">{row.theft1}</td>
                  <td className="p-4 font-black text-amber-600 border-r border-slate-100 bg-amber-50/20 text-sm">{row.disable1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-right bg-slate-50 relative flex flex-col" dir="rtl">
      {showAnnouncement && (
        <AnnouncementBanner
          text={settings.announcement_text}
          type={settings.announcement_type || 'info'}
          onClose={() => setAnnouncementDismissed(true)}
        />
      )}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 py-3">
        <div className="max-w-6xl mx-auto bg-[rgba(15,23,42,0.85)] backdrop-blur-xl rounded-[1.5rem] md:rounded-full border border-white/10 shadow-2xl flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-full flex items-center justify-center text-white"><Smartphone className="w-4 h-4" /></div>
            <h1 className="font-black text-base text-white">סלולטור <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">2026</span></h1>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {[{ id: 'calculator', icon: Calculator, label: 'מחשבון' }, { id: 'guide', icon: BookOpen, label: 'המדריך' }, { id: 'maintenance', icon: Wrench, label: 'מחירון' }, { id: 'faq', icon: HelpCircle, label: 'שו"ת' }].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-white text-[#0B1120] scale-105' : 'text-slate-300 hover:text-white'}`}>
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#4F46E5]' : ''}`} />{tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      <div className="pt-20 md:pt-24"></div>

      <main className="max-w-6xl mx-auto px-4 relative pb-10 flex-grow w-full">
        {activeTab === 'calculator' && renderCalculator()}
        {activeTab === 'guide' && renderGuide()}
        {activeTab === 'maintenance' && renderMaintenance()}
        {activeTab === 'faq' && (
          <div className="animate-in fade-in max-w-3xl mx-auto relative z-10">
            <h2 className="text-4xl font-black text-center text-slate-800 mb-8">שאלות ותשובות</h2>
            <div className="space-y-4">{faq.map((item, idx) => <AccordionItem key={idx} question={item.question} answer={item.answer} />)}</div>
          </div>
        )}
      </main>
      <footer className="mt-auto bg-white/50 backdrop-blur-lg border-t border-slate-200/60 py-6 relative z-10 pb-24 md:pb-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#4F46E5]" /><span className="font-black text-slate-800 text-sm">{settings.app_title}</span></div>
          <div className="text-sm font-medium text-slate-500 flex items-center gap-1">אופיין ופותח ע״י <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">דינה שרון</span> | משרד התקשורת</div>
        </div>
      </footer>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[rgba(15,23,42,0.9)] backdrop-blur-xl border-t border-white/10 px-2 pb-6 pt-2 z-50">
        <div className="flex justify-between">
          {[{ id: 'calculator', icon: Calculator, label: 'מחשבון' }, { id: 'guide', icon: BookOpen, label: 'מדריך' }, { id: 'maintenance', icon: Wrench, label: 'מחירון' }, { id: 'faq', icon: HelpCircle, label: 'שו"ת' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex flex-col items-center justify-center gap-1 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}>
              <div className={`p-2 rounded-xl ${activeTab === tab.id ? 'bg-gradient-to-br from-[#4F46E5] to-[#06B6D4]' : ''}`}><tab.icon className="w-5 h-5" /></div>
              <span className="text-[10px] font-bold">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;900&display=swap'); * { font-family: 'Heebo', sans-serif !important; } .glass-panel { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); }` }} />
    </div>
  );
}
