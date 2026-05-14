import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Create the context
const ThemeContext = createContext(null);

/**
 * ThemeProvider wraps the entire app and provides theme to all components.
 * Usage: wrap <App /> with <ThemeProvider>
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('ats-theme', 'dark');

  // Apply/remove the "dark" class on <html> whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to use theme anywhere in the app
 * @example
 * const { theme, toggleTheme } = useTheme();
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return context;
}