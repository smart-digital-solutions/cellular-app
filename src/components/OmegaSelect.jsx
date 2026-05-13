import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const OmegaSelect = ({ value, onChange, options, placeholder, disabled, groups = false, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const listboxId = React.useId();

  const handleSetIsOpen = useCallback((val) => {
    setIsOpen(val);
    onOpenChange?.(val);
  }, [onOpenChange]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) handleSetIsOpen(false);
    };
    const handleKeyDown = (e) => { if (e.key === 'Escape') handleSetIsOpen(false); };
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
        className="w-full backdrop-blur-md border-2 py-4 px-5 rounded-[1.2rem] focus:ring-4 focus:ring-indigo-500/20 focus:border-[#4F46E5] font-bold text-base text-right flex justify-between items-center transition-all hover:border-indigo-300 cursor-pointer"
        style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}
      >
        <span style={{ color: value ? 'var(--clr-text-1)' : 'var(--clr-text-3)' }}>
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
          style={{ animation: '0.25s cubic-bezier(0.34,1.56,0.64,1) both scale-in', backgroundColor: 'var(--clr-surface)' }}
        >
          {groups ? (
            Object.entries(options).map(([category, items]) => (
              <div key={category} className="border-b last:border-0" style={{ borderColor: 'var(--clr-border)' }}>
                <div className="px-5 py-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest" style={{ backgroundColor: 'var(--clr-surface-2)' }} role="presentation">{category}</div>
                {items.map((opt) => (
                  <div
                    key={opt.id}
                    role="option"
                    aria-selected={opt.id === value}
                    tabIndex={0}
                    onClick={() => { onChange({ target: { value: opt.id } }); handleSetIsOpen(false); }}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange({ target: { value: opt.id } }); handleSetIsOpen(false); } }}
                    className={`w-full px-5 py-3.5 text-right flex justify-between items-center transition-colors group border-b last:border-0 cursor-pointer ${opt.id === value ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-indigo-50/70 dark:hover:bg-indigo-900/20'}`}
                    style={{ borderColor: 'var(--clr-border)' }}
                  >
                    <span className="font-bold" style={{ color: opt.id === value ? 'var(--clr-primary)' : 'var(--clr-text-1)' }}>{opt.label}</span>
                    {opt.totalCost > 0 && (
                      <span className="font-black opacity-70 group-hover:text-indigo-600 bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-lg text-xs" dir="ltr" style={{ color: 'var(--clr-text-2)' }}>
                        {opt.totalCost.toFixed(2)} ₪
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            options.map((opt) => (
              <div
                key={opt.id}
                role="option"
                aria-selected={opt.id === value}
                tabIndex={0}
                onClick={() => { onChange({ target: { value: opt.id } }); handleSetIsOpen(false); }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange({ target: { value: opt.id } }); handleSetIsOpen(false); } }}
                className={`w-full px-5 py-4 text-right flex justify-between items-center transition-colors group border-b last:border-0 cursor-pointer ${opt.id === value ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-indigo-50/70 dark:hover:bg-indigo-900/20'}`}
                style={{ borderColor: 'var(--clr-border)' }}
              >
                <span className="font-bold" style={{ color: opt.id === value ? 'var(--clr-primary)' : 'var(--clr-text-1)' }}>{opt.label}</span>
                {opt.allowance !== undefined && (
                  <span className="font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg text-xs" dir="ltr">
                    {opt.allowance.toFixed(2)} ₪
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default OmegaSelect;
