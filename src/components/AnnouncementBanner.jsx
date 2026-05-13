import { Megaphone, X } from 'lucide-react';

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

export default AnnouncementBanner;
