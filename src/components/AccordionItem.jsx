import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = React.useId();
  return (
    <div
      className="group border rounded-[1.5rem] mb-4 overflow-hidden backdrop-blur-md omega-shadow hover:shadow-lg transition-all duration-300"
      style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}
    >
      <button
        className="w-full px-5 py-5 text-right flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
        id={`accordion-btn-${id}`}
      >
        <span className="font-bold pe-2 text-base sm:text-lg group-hover:text-[#4F46E5] transition-colors" style={{ color: 'var(--clr-text-1)' }}>{question}</span>
        <div className={`p-2 rounded-full transition-all duration-300 shrink-0 ms-3 ${isOpen ? 'bg-[#4F46E5] text-white shadow-md' : 'text-slate-500'}`} style={{ backgroundColor: isOpen ? undefined : 'var(--clr-surface-2)' }}>
          <ChevronDown
            className="w-4 h-4"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
            aria-hidden="true"
          />
        </div>
      </button>
      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-btn-${id}`}
        style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="px-5 pb-5 pt-0 leading-relaxed text-sm whitespace-pre-line" style={{ color: 'var(--clr-text-2)' }}>
            <div className="h-px w-full mb-4" style={{ backgroundColor: 'var(--clr-border)' }}></div>{answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
