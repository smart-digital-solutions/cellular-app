import { Moon, Sun } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

export default function ThemeToggle({ defaultTheme }) {
  
  // Determine the effective theme on first render.
  // Priority: 1) User's manual override (localStorage)
  //           2) The DOM's current dark class (set by the inline script in index.html)
  //           3) settings.default_theme from Google Sheets / fallback
  const [isDark, setIsDark] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme_override');
      if (savedTheme) return savedTheme === 'dark';
    } catch {
      // localStorage might be blocked (strict incognito)
    }
    // Trust the inline script's decision — it already read settings.csv at build time
    return document.documentElement.classList.contains('dark');
  });

  // Track if user manually overrode the theme
  const [hasManualOverride] = useState(() => {
    try {
      return localStorage.getItem('theme_override') !== null;
    } catch {
      return false;
    }
  });

  // When Google Sheets data arrives and user hasn't manually overridden,
  // sync to the sheet's default_theme value.
  useEffect(() => {
    if (!hasManualOverride && defaultTheme) {
      const sheetTheme = defaultTheme.trim().toUpperCase();
      const shouldBeDark = sheetTheme !== 'LIGHT';
      setIsDark(shouldBeDark);
    }
  }, [defaultTheme, hasManualOverride]);

  // Apply DOM changes — this is the SINGLE source of truth for the class
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newTheme = !prev;
      try {
        localStorage.setItem('theme_override', newTheme ? 'dark' : 'light');
      } catch {
        // localStorage blocked — toggle still works for this session
      }
      return newTheme;
    });
  }, []);

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
