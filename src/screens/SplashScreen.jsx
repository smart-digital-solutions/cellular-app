import { Smartphone, Sparkles } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 overflow-hidden" dir="rtl">
      
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU5IDB2NjBIMFYwaDU5em0tMSAxaC01OHY1OGg1OFYxeiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-30 mix-blend-overlay" />

      <div className="relative z-10 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700 w-full max-w-sm mx-auto px-4">
        <div className="relative mb-6 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-full blur-xl opacity-40 animate-pulse" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-full flex items-center justify-center shadow-2xl">
            <Smartphone className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            <Sparkles className="absolute top-4 right-4 w-4 h-4 text-cyan-300 animate-ping" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-white tracking-tight mb-2 flex flex-wrap items-center justify-center gap-2 text-center w-full">
          סלולטור <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">2026</span>
        </h1>
        
        <p className="text-slate-400 font-medium text-sm mb-8 text-center w-full">טוען נתונים...</p>

        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 w-full animate-[progress_1.5s_ease-in-out_infinite]" style={{ backgroundSize: '200% 100%' }}></div>
        </div>
      </div>
      
      {/* Footer credit */}
      <div className="absolute bottom-8 left-0 right-0 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
        <p className="text-sm font-medium text-slate-500 flex flex-wrap items-center justify-center gap-1.5 text-center">
            אופיין ופותח ע״י{' '}
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">דינה שרון</span>
            <span className="hidden sm:inline">|</span> משרד התקשורת
        </p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}} />
    </div>
  );
};

export default SplashScreen;
