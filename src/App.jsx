import { useState, useEffect, useMemo } from 'react';
import {
  Calculator, BookOpen, HelpCircle, Receipt, Wrench, Smartphone, Sparkles, AlertTriangle
} from 'lucide-react';
import { useAppData } from './useAppData';
import AnnouncementBanner from './components/AnnouncementBanner';
import CalculatorScreen from './screens/CalculatorScreen';
import TerminationScreen from './screens/TerminationScreen';
import MaintenanceScreen from './screens/MaintenanceScreen';
import GuideScreen from './screens/GuideScreen';
import FaqScreen from './screens/FaqScreen';
import ImportantNotesScreen from './screens/ImportantNotesScreen';
import SiteMaintenanceScreen from './screens/SiteMaintenanceScreen';
import SplashScreen from './screens/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeToggle from './components/ThemeToggle';

// ── Navigation config ──────────────────────────────────────
const ALL_TABS_MAP = {
  calculator: { icon: Calculator, label: 'מחשבון עלויות', mobileLabel: 'עלויות' },
  termination: { icon: Receipt, label: 'מחשבון סיום ליסינג', mobileLabel: 'סיום ליסינג' },
  maintenance: { icon: Wrench, label: 'מחירון נזקים', mobileLabel: 'נזקים' },
  guide: { icon: BookOpen, label: 'מדריך והנחיות', mobileLabel: 'מדריך' },
  faq: { icon: HelpCircle, label: 'שאלות ותשובות', mobileLabel: 'שאלות' },
  important_notes: { icon: AlertTriangle, label: 'דגשים חשובים', mobileLabel: 'דגשים' },
};

export default function App() {
  const { tiers, devices, maintenance, faq, settings, catalog, catalogIsFallback, guide, importantNotes, terminationRules, source, loading, lastUpdated } = useAppData();
  const [activeTab, setActiveTab] = useState('');
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [showMinimumSplash, setShowMinimumSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowMinimumSplash(false), 3700);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic Navigation based on Settings
  const visibleTabs = useMemo(() => {
    if (!settings) return [];
    return Object.entries(ALL_TABS_MAP).map(([id, defaultData]) => {
      const activeStr = settings[`nav_${id}_active`];
      const isActive = activeStr === undefined || String(activeStr).toUpperCase() === 'TRUE';
      const order = parseInt(settings[`nav_${id}_order`]) || 99;
      const label = settings[`nav_${id}_label`] || defaultData.label;
      return {
        id,
        icon: defaultData.icon,
        label,
        mobileLabel: defaultData.mobileLabel, // We could allow overriding mobile label too, but let's keep it simple
        order,
        isActive
      };
    }).filter(t => t.isActive).sort((a, b) => a.order - b.order);
  }, [settings]);

  // Set default active tab on load or when settings change
  useEffect(() => {
    if (visibleTabs.length > 0) {
      if (!visibleTabs.find(t => t.id === activeTab)) {
        setActiveTab(visibleTabs[0].id);
      }
    }
  }, [visibleTabs, activeTab]);

  // Merge catalog + local special devices (BYOD / כשר / אביזרים)
  const allDevices = useMemo(() => {
    const localSpecial = devices.filter(d =>
      ['מסלולים אישיים (BYOD)', 'מכשירים כשרים (לחצנים)', 'אביזרים'].includes(d.category)
    );
    return catalog && catalog.length > 0 ? [...localSpecial, ...catalog] : devices;
  }, [devices, catalog]);

  // Grouped catalog for Termination + Maintenance screens
  const groupedCatalog = useMemo(() => (catalog || []).reduce((acc, device) => {
    if (device.totalCost <= 0) return acc;
    if (!acc[device.category]) acc[device.category] = [];
    acc[device.category].push(device);
    return acc;
  }, {}), [catalog]);

  // Scroll to top on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const showAnnouncement = settings.show_announcement === 'TRUE'
    && settings.announcement_text
    && !announcementDismissed;

  const [renderSplash, setRenderSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  // Global Maintenance Mode check
  const siteActiveStr = String(settings.site_active || 'TRUE').trim().toUpperCase();
  const isSiteActive = siteActiveStr === 'TRUE' || siteActiveStr === '1' || siteActiveStr === 'YES' || siteActiveStr === 'פעיל' || siteActiveStr === 'כן';
  
  // Allow local development to bypass maintenance mode
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const shouldShowMaintenance = !isSiteActive && !isLocalhost;
  
  // Splash screen logic
  const isSplashActive = (loading && !lastUpdated) || showMinimumSplash;

  useEffect(() => {
    if (!isSplashActive) {
      setFadeSplash(true);
      const timer = setTimeout(() => {
        setRenderSplash(false);
      }, 1200); // 1.2s for splashExit animation
      return () => clearTimeout(timer);
    } else {
      setRenderSplash(true);
      setFadeSplash(false);
    }
  }, [isSplashActive]);

  if (shouldShowMaintenance && !renderSplash) {
    return (
      <div className="animate-app-reveal">
        <SiteMaintenanceScreen title={settings.maintenance_title} message={settings.maintenance_message} />
      </div>
    );
  }

  return (
    <>
      {renderSplash && <SplashScreen className={fadeSplash ? "animate-splash-exit pointer-events-none" : ""} />}
      
      {!shouldShowMaintenance && (
        <div
          className={`min-h-screen text-right relative flex flex-col mesh-gradient-bg ${fadeSplash ? 'animate-app-reveal' : 'opacity-0'} ${renderSplash ? 'h-screen overflow-hidden' : ''}`}
          dir="rtl"
          style={{ backgroundColor: 'var(--clr-bg)', color: 'var(--clr-text-1)' }}
        >
      {/* Dot-grid overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* Announcement banner */}
      {showAnnouncement && (
        <AnnouncementBanner
          text={settings.announcement_text}
          type={settings.announcement_type || 'info'}
          onClose={() => setAnnouncementDismissed(true)}
        />
      )}

      {/* ── Header / Desktop Nav ── */}
      <header
        className="fixed left-0 right-0 z-50 px-3 py-2"
        style={{ top: showAnnouncement ? '44px' : '0', transition: 'top 0.3s cubic-bezier(0.4,0,0.2,1)' }}
        role="banner"
      >
        <div className="max-w-6xl mx-auto bg-white/80 dark:bg-[rgba(15,23,42,0.85)] backdrop-blur-xl rounded-[1rem] md:rounded-full border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl flex items-center justify-between px-4 py-2 transition-colors duration-300">
          <button 
            type="button"
            onClick={() => window.location.href = window.location.pathname}
            className="group relative flex items-center gap-3 cursor-pointer hover:opacity-100 transition-opacity text-right focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full pr-1"
          >
            <div className="w-7 h-7 bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-full flex items-center justify-center text-white shrink-0 shadow-sm" aria-hidden="true">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="font-black text-base text-slate-800 dark:text-white transition-colors duration-300" aria-label="סלולטור 2026">
              סלולטור <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">2026</span>
            </span>

            {/* Custom Styled Tooltip */}
            <span className="absolute top-[calc(100%+0.75rem)] right-0 md:right-1/2 md:translate-x-1/2 w-max px-3 py-1.5 bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl border border-slate-700 dark:border-slate-600 scale-95 group-hover:scale-100 z-[100]
            after:content-[''] after:absolute after:-top-2 after:right-6 md:after:right-1/2 md:after:translate-x-1/2 after:border-[6px] after:border-transparent after:border-b-slate-800 dark:after:border-b-slate-700">
              טעינה מחדש של המערכת
            </span>
          </button>
          <div className="flex items-center gap-1">
            <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="ניווט ראשי">
              {visibleTabs.map(tab => (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                  aria-label={tab.label}
                  className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all duration-300 ${activeTab === tab.id ? 'bg-slate-800 text-white dark:bg-white dark:text-[#0B1120] scale-105 glow-active' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'}`}
                >
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-cyan-400 dark:text-[#4F46E5]' : ''}`} aria-hidden="true" />
                  {tab.label}
                </button>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Header spacer */}
      <div className={`transition-all duration-300 ${showAnnouncement ? 'pt-28 md:pt-32' : 'pt-16 md:pt-20'}`} />

      {/* ── Main content ── */}
      <main id="main-content" className="max-w-6xl mx-auto px-4 relative z-40 pb-nav-safe flex-grow w-full" role="main">
        <ErrorBoundary>
          <div className={activeTab === 'calculator' ? 'block' : 'hidden'}><CalculatorScreen tiers={tiers} allDevices={allDevices} /></div>
          <div className={activeTab === 'termination' ? 'block' : 'hidden'}><TerminationScreen catalog={catalog} catalogIsFallback={catalogIsFallback} groupedCatalog={groupedCatalog} terminationRules={terminationRules} /></div>
          <div className={activeTab === 'maintenance' ? 'block' : 'hidden'}><MaintenanceScreen maintenance={maintenance} catalog={catalog} groupedCatalog={groupedCatalog} /></div>
          <div className={activeTab === 'guide' ? 'block' : 'hidden'}><GuideScreen guide={guide} /></div>
          <div className={activeTab === 'faq' ? 'block' : 'hidden'}><FaqScreen faq={faq} /></div>
          <div className={activeTab === 'important_notes' ? 'block' : 'hidden'}><ImportantNotesScreen importantNotes={importantNotes} /></div>
        </ErrorBoundary>
      </main>

      {/* ── Footer ── */}
      <footer
        className="mt-auto backdrop-blur-lg border-t py-4 relative z-10 pb-20 md:pb-6"
        role="contentinfo"
        style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-right">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4F46E5]" />
              <span className="font-black text-slate-800 dark:text-white text-sm transition-colors duration-300">{settings.app_title}</span>
              <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800 transition-colors duration-300">{settings.app_version || 'v06.2026'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                עודכן ב: {typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : new Date().toLocaleDateString('he-IL')} (מכרז 01-2024)
              </div>
              <div className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border transition-colors duration-300 ${source === 'sheets' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/50'}`}>
                {source === 'sheets' ? 'LIVE' : 'OFFLINE'}
              </div>
              {loading && (
                <div className="text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/50 animate-pulse transition-colors duration-300">
                  מעדכן...
                </div>
              )}
            </div>
          </div>
          <div className="text-sm font-medium text-slate-500 flex items-center gap-1">
            אופיין ופותח ע״י{' '}
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">דינה שרון</span>
            {' '}| משרד התקשורת
          </div>
        </div>
      </footer>

      {/* ── Mobile bottom nav ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[rgba(15,23,42,0.85)] backdrop-blur-2xl border-t border-slate-200 dark:border-slate-700/50 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-2 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.15)] transition-colors duration-300"
        role="navigation"
        aria-label="ניווט תחתון"
      >
        <div className="flex justify-around items-end w-full px-1">
          {visibleTabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              aria-label={tab.label}
              className={`relative flex-1 flex flex-col items-center justify-center gap-1 min-h-[50px] transition-all duration-300 active:scale-95 ${activeTab === tab.id ? 'text-slate-900 dark:text-white scale-105' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${activeTab === tab.id ? 'bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] shadow-[0_4px_12px_rgba(79,70,229,0.2)] dark:shadow-[0_4px_12px_rgba(79,70,229,0.4)] text-white' : 'bg-transparent text-inherit'}`}>
                <tab.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className={`text-[10px] whitespace-nowrap transition-all duration-300 ${activeTab === tab.id ? 'font-black' : 'font-semibold'}`}>
                {tab.mobileLabel}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
    )}
    </>
  );
}
