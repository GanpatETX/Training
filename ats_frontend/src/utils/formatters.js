// ============================================
// UTILITY / HELPER FUNCTIONS
// ============================================

/**
 * Format a date string to readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} formatted date like "Apr 20"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Get initials from a full name
 * @param {string} name
 * @returns {string} e.g. "Kiran Mehta" → "KM"
 */
export function getInitials(name) {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Truncate a string to N characters
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export function truncate(str, maxLen = 40) {
  if (!str) return '';
  return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
}

/**
 * Generate a score color class based on value
 * @param {number} score
 * @returns {string} CSS class name
 */
export function getScoreColor(score) {
  if (score >= 90) return 'score-excellent';
  if (score >= 75) return 'score-good';
  if (score >= 60) return 'score-average';
  return 'score-poor';
}