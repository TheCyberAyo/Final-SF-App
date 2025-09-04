import { useEffect, useState } from 'react';

/**
 * Web-compatible color scheme hook
 */
export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setColorScheme(savedTheme);
    } else {
      // Check system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setColorScheme(mediaQuery.matches ? 'dark' : 'light');
      
      // Listen for changes
      const handler = (e: MediaQueryListEvent) => {
        setColorScheme(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  return colorScheme;
}
