/**
 * Promise-based sleep / delay helper
 * @param {number} ms  milliseconds
 * @returns {Promise<void>}
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generate a random order ID string
 * @returns {string}  e.g. "ORD-4821"
 */
export const generateOrderId = () =>
  `ORD-${Math.floor(Math.random() * 9000) + 1000}`;

/**
 * Generate a 4-digit delivery OTP
 * @returns {string}
 */
export const generateOTP = () =>
  String(Math.floor(Math.random() * 9000) + 1000);

/**
 * Clamp a number between min and max
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/**
 * Deep clone a plain object / array (JSON-safe)
 * @param {*} obj
 * @returns {*}
 */
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Check if a value is empty (null, undefined, '', [], {})
 * @param {*} val
 * @returns {boolean}
 */
export const isEmpty = (val) => {
  if (val == null) return true;
  if (typeof val === 'string') return val.trim().length === 0;
  if (Array.isArray(val)) return val.length === 0;
  if (typeof val === 'object') return Object.keys(val).length === 0;
  return false;
};
