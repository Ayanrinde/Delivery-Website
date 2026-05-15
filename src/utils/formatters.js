/**
 * Format a number as Nigerian Naira currency
 * @param {number} amount
 * @returns {string}  e.g. "₦15,000"
 */
export const formatCurrency = (amount) =>
  `₦${Number(amount).toLocaleString('en-NG')}`;

/**
 * Format a date string or timestamp to a readable form
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

/**
 * Get user initials from a full name (up to 2 chars)
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name = '') =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * Truncate a string to maxLen characters
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export const truncate = (str, maxLen = 60) =>
  str.length > maxLen ? `${str.slice(0, maxLen)}…` : str;

/**
 * Capitalise the first letter of a string
 * @param {string} str
 * @returns {string}
 */
export const capitalise = (str = '') =>
  str.charAt(0).toUpperCase() + str.slice(1);
