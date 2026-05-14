import { useState } from 'react';

/**
 * Like useState but persists the value in localStorage.
 * Used for remembering theme preference, sidebar state, etc.
 *
 * @param {string} key - localStorage key name
 * @param {any} initialValue - default value if nothing stored yet
 * @returns {[any, Function]} [storedValue, setValue]
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'dark');
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('useLocalStorage read error:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn('useLocalStorage write error:', error);
    }
  };

  return [storedValue, setValue];
}