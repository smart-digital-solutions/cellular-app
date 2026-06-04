import { Smartphone, Sparkles } from 'lucide-react';

const SplashScreen = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 overflow-hidden transition-opacity duration-300 ${className}`} dir="rtl">
      
      {/* Simple gradient backgrounds — no heavy blur animations during load */}
      <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-indigo-200/30 dark:bg-indigo-600/15 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-cyan-200/30 dark:bg-cyan-600/15 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm mx-auto px-4">
        <div className="relative mb-6">
          <div className="relative w-20 h-20 bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-xl">
            <Smartphone className="w-9 h-9 text-slate-800 dark:text-white" aria-hidden="true" />
            <Sparkles className="absolute top-3 right-3 w-4 h-4 text-cyan-500 dark:text-cyan-300 animate-ping" aria-hidden="true" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-4 text-center">
          סלולטור <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">2026</span>
        </h1>
        
        {/* Simple CSS-only loading bar — no JS timers */}
        <div className="w-48 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full animate-[loading-bar_0.4s_ease-out_forwards]" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

