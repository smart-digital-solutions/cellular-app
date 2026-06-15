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
