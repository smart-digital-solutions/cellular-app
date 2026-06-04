import { Wrench, Settings, Cog, Sparkles, Server } from 'lucide-react';

const SiteMaintenanceScreen = ({ title, message }) => {
  return (
    <div className="min-h-screen text-right relative flex flex-col items-center justify-center overflow-hidden bg-[#0B1120]" dir="rtl">
      
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-amber-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU5IDB2NjBIMFYwaDU5em0tMSAxaC01OHY1OGg1OFYxeiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-50 mix-blend-overlay" />

      {/* Floating decorative icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Settings className="absolute top-1/4 left-1/4 w-16 h-16 text-indigo-500/10 animate-[spin_10s_linear_infinite]" />
        <Cog className="absolute bottom-1/3 right-1/4 w-24 h-24 text-cyan-500/10 animate-[spin_15s_linear_infinite_reverse]" />
        <Server className="absolute top-1/3 right-1/3 w-12 h-12 text-amber-500/10 animate-bounce" style={{ animationDuration: '3s' }} />
      </div>

      <div className="relative z-10 max-w-2xl w-full px-4">
        <div className="bg-[rgba(15,23,42,0.6)] backdrop-blur-2xl rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 p-10 md:p-16 text-center transform transition-all hover:scale-[1.01] duration-500 relative overflow-hidden">
          
          {/* Subtle top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

          {/* Icon Container with glowing effect */}
          <div className="relative mx-auto w-28 h-28 mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-orange-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
            <div className="relative h-full w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent" />
              <Wrench className="w-12 h-12 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] z-10" />
              <Sparkles className="absolute top-4 right-4 w-4 h-4 text-amber-200 animate-ping" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 drop-shadow-sm tracking-tight">
            {title || 'האתר בשידרוגים'}
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg mx-auto font-medium whitespace-pre-wrap">
            {message || 'אנו עורכים כעת עדכוני מערכת. נשוב לפעילות בהקדם. עמכם הסליחה.'}
          </p>

          <div className="inline-flex flex-col items-center">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl shadow-inner backdrop-blur-md">
              <div className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
              </div>
              <span className="text-cyan-50 font-bold tracking-wide text-sm">
                משדרגים את החוויה...
              </span>
            </div>
            
            {/* Progress bar simulation */}
            <div className="mt-6 w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 w-full animate-[progress_2s_ease-in-out_infinite]" style={{ backgroundSize: '200% 100%' }}></div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Required keyframes for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}} />
    </div>
  );
};

export default SiteMaintenanceScreen;
