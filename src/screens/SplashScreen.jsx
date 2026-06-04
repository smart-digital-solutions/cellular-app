import { Smartphone, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const SplashScreen = ({ className = '' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 3000ms ensures we hit 100% comfortably before the 3700ms minimum splash screen duration
    const duration = 3000; 
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const currentElapsed = Date.now() - startTime;
      const percent = Math.min(100, Math.floor((currentElapsed / duration) * 100));
      setProgress(percent);
      
      if (currentElapsed >= duration) {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 overflow-hidden transition-all duration-700 ${className}`} dir="rtl">
      
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-indigo-200/50 dark:bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-cyan-200/50 dark:bg-cyan-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU5IDB2NjBIMFYwaDU5em0tMSAxaC01OHY1OGg1OFYxeiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-30 mix-blend-overlay" />

      <div className="relative z-10 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700 w-full max-w-sm mx-auto px-4">
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-full blur-xl opacity-20 dark:opacity-40 animate-pulse" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-xl dark:shadow-2xl">
            <Smartphone className="w-10 h-10 text-slate-800 dark:text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" aria-hidden="true" />
            <Sparkles className="absolute top-4 right-4 w-4 h-4 text-cyan-500 dark:text-cyan-300 animate-ping" aria-hidden="true" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2 flex flex-wrap items-center justify-center gap-2 text-center w-full">
          סלולטור <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">2026</span>
        </h1>
        
        <div className="flex flex-col items-center w-full mb-6">
          <div className="flex justify-between w-48 text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 px-1" dir="rtl">
            <span>טוען נתונים...</span>
            <span className="tabular-nums text-indigo-600 dark:text-cyan-400">{progress}%</span>
          </div>
          <div className="w-48 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mx-auto" dir="ltr">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Footer credit */}
      <div className="absolute bottom-8 left-0 right-0 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
        <div className="mt-8 text-xs font-medium text-slate-500 max-w-[200px] text-center w-full mx-auto">
          אופיין ופותח ע״י<br/>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">דינה שרון</span> | משרד התקשורת
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
