import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const parseRichText = (text) => {
  if (typeof text !== 'string') return text;
  // Split by _..._ or *...* or URLs
  // URL regex avoids trailing punctuation by ensuring it ends with a letter, number, or slash.
  const regex = /(_[^_]+_|\*[^*]+\*|https?:\/\/[^\s]+[a-zA-Z0-9/])/g;
  const parts = text.split(regex);
  
  return parts.map((part, i) => {
    if (part.startsWith('_') && part.endsWith('_')) {
      return <span key={i} className="underline underline-offset-4 decoration-2">{part.slice(1, -1)}</span>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <strong key={i} className="font-bold">{part.slice(1, -1)}</strong>;
    }
    if (part.startsWith('http://') || part.startsWith('https://')) {
      return (
        <a 
          key={i} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#4F46E5] dark:text-[#06B6D4] font-bold underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
          style={{ direction: 'ltr', display: 'inline-block' }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

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
        <span className="font-bold pe-2 text-base sm:text-lg group-hover:text-[#4F46E5] transition-colors" style={{ color: 'var(--clr-text-1)' }}>{parseRichText(question)}</span>
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
            <div className="h-px w-full mb-4" style={{ backgroundColor: 'var(--clr-border)' }}></div>{parseRichText(answer)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
