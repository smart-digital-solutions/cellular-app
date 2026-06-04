import { Wrench } from 'lucide-react';

const SiteMaintenanceScreen = ({ title, message }) => {
  return (
    <div className="min-h-screen text-right relative flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4" dir="rtl">
      {/* Dot-grid overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply dark:mix-blend-overlay"
        style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      
      <div className="relative z-10 max-w-xl w-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8 md:p-12 text-center animate-in zoom-in-95 duration-500">
        
        <div className="mx-auto w-20 h-20 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Wrench className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-4">
          {title || 'האתר בשידרוגים'}
        </h1>
        
        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
          {message || 'אנו עורכים כעת עדכוני מערכת. נשוב לפעילות בהקדם. עמכם הסליחה.'}
        </p>

        <div className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl font-bold text-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          עובדים על זה...
        </div>
      </div>
    </div>
  );
};

export default SiteMaintenanceScreen;
