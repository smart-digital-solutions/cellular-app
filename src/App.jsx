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
  const { tiers, devices, maintenance, faq, settings, catalog, catalogIsFallback, guide, importantNotes, terminationRules, source, loading } = useAppData();
  const [activeTab, setActiveTab] = useState('');
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

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

  // Global Maintenance Mode check
  const siteActiveStr = String(settings.site_active || 'TRUE').trim().toUpperCase();
  const isSiteActive = siteActiveStr === 'TRUE' || siteActiveStr === '1' || siteActiveStr === 'YES' || siteActiveStr === 'פעיל' || siteActiveStr === 'כן';
  
  // Show maintenance screen if not active (and avoid flashing it if we are still initially loading from cache)
  if (!isSiteActive) {
    return <SiteMaintenanceScreen title={settings.maintenance_title} message={settings.maintenance_message} />;
  }

  return (
    <div
      className="min-h-screen text-right relative flex flex-col mesh-gradient-bg"
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
        <div className="max-w-6xl mx-auto bg-[rgba(15,23,42,0.85)] backdrop-blur-xl rounded-[1rem] md:rounded-full border border-white/10 shadow-2xl flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-full flex items-center justify-center text-white" aria-hidden="true">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="font-black text-base text-white" aria-label="סלולטור 2026">
              סלולטור <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">2026</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="ניווט ראשי">
            {visibleTabs.map(tab => (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id ? 'page' : undefined}
                aria-label={tab.label}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-white text-[#0B1120] scale-105 glow-active' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#4F46E5]' : ''}`} aria-hidden="true" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Header spacer */}
      <div className={`transition-all duration-300 ${showAnnouncement ? 'pt-28 md:pt-32' : 'pt-16 md:pt-20'}`} />

      {/* ── Main content ── */}
      <main id="main-content" className="max-w-6xl mx-auto px-4 relative z-40 pb-nav-safe flex-grow w-full" role="main">
        {activeTab === 'calculator'  && <CalculatorScreen  tiers={tiers} allDevices={allDevices} />}
        {activeTab === 'termination' && <TerminationScreen catalog={catalog} catalogIsFallback={catalogIsFallback} groupedCatalog={groupedCatalog} terminationRules={terminationRules} />}
        {activeTab === 'maintenance' && <MaintenanceScreen maintenance={maintenance} catalog={catalog} groupedCatalog={groupedCatalog} />}
        {activeTab === 'guide'       && <GuideScreen guide={guide} />}
        {activeTab === 'faq'         && <FaqScreen faq={faq} />}
        {activeTab === 'important_notes' && <ImportantNotesScreen importantNotes={importantNotes} />}
      </main>

      {/* ── Footer ── */}
      <footer
        className="mt-auto backdrop-blur-lg border-t py-6 relative z-10 pb-24 md:pb-8"
        role="contentinfo"
        style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-right">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4F46E5]" />
              <span className="font-black text-slate-800 text-sm">{settings.app_title}</span>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-indigo-200">{settings.app_version || 'v06.2026'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                עודכן ב: {typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : new Date().toLocaleDateString('he-IL')} (מכרז 01-2024)
              </div>
              <div className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border ${source === 'sheets' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                {source === 'sheets' ? 'LIVE' : 'OFFLINE'}
              </div>
              {loading && (
                <div className="text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border bg-indigo-50 text-indigo-500 border-indigo-100 animate-pulse">
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
        className="md:hidden fixed bottom-0 left-0 right-0 bg-[rgba(15,23,42,0.9)] backdrop-blur-xl border-t border-white/10 px-2 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-2 z-50 overflow-x-auto overflow-y-hidden"
        role="navigation"
        aria-label="ניווט תחתון"
      >
        <div className="flex justify-between min-w-max px-2">
          {visibleTabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              aria-label={tab.label}
              className={`flex-1 flex flex-col items-center justify-center gap-1 min-h-[52px] px-3 transition-colors ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}
            >
              <div className={`p-2 rounded-xl transition-all duration-200 ${activeTab === tab.id ? 'bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] shadow-lg' : ''}`}>
                <tab.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-[10px] font-bold whitespace-nowrap">{tab.mobileLabel}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
