import { useState, useEffect } from 'react';

/**
 * Delays updating a value until the user stops typing.
 * Used for search inputs so we don't call the API on every keystroke.
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - Milliseconds to wait (default 400)
 * @returns {any} debounced value
 *
 * @example
 * const debouncedSearch = useDebounce(searchQuery, 400);
 * // Only fires API call 400ms after user stops typing
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel the timer if value changes before delay
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}