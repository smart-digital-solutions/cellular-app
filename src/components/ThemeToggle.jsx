import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppData } from '../useAppData';

export default function ThemeToggle() {
  const { settings } = useAppData();
  
  // Track if user manually overrode the theme
  const [hasManualOverride, setHasManualOverride] = useState(() => {
    return localStorage.getItem('theme_override') !== null;
  });

  // Initialize state
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme_override');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    const defaultTheme = settings?.default_theme?.toUpperCase();
    return defaultTheme !== 'LIGHT';
  });

  // Listen to changes from Google Sheets (when fetch completes)
  useEffect(() => {
    if (!hasManualOverride) {
      const defaultTheme = settings?.default_theme?.toUpperCase();
      setIsDark(defaultTheme !== 'LIGHT');
    }
  }, [settings?.default_theme, hasManualOverride]);

  // Apply DOM changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    setHasManualOverride(true);
    localStorage.setItem('theme_override', newTheme ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-white/10 hover-lift ml-2"
      aria-label="החלף מצב תצוגה (יום/לילה)"
    >
      {/* Sun icon for light mode */}
      <Sun 
        className={`absolute w-5 h-5 transition-all duration-500 ${isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} 
      />
      {/* Moon icon for dark mode */}
      <Moon 
        className={`absolute w-5 h-5 transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} 
      />
    </button>
  );
}
