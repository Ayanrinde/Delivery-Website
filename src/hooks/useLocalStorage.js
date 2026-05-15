import { useState } from 'react';

/**
 * useState that syncs to localStorage.
 * @param {string} key
 * @param {*} initialValue
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const toStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(toStore);
      window.localStorage.setItem(key, JSON.stringify(toStore));
    } catch (err) {
      console.warn(`useLocalStorage: failed to write key "${key}"`, err);
    }
  };

  return [storedValue, setValue];
}
