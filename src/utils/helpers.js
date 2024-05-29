/**
 * Transforma una fecha en formato ISO 8601 a formato \/Date(...)\/
 * @param {string} isoDate - La fecha en formato ISO 8601
 * @returns {string} - La fecha en formato \/Date(...)\/
 */
export const transformToWcfDate = (isoDate) => {
    const date = new Date(isoDate);
    const timestamp = date.getTime();
    return `/Date(${timestamp})/`;
  };


/**
 * Transforma una fecha en formato \/Date(...)\/ a formato ISO 8601
 * @param {string} wcfDate - La fecha en formato \/Date(...)\/
 * @returns {string} - La fecha en formato ISO 8601 (YYYY-MM-DD)
 */
export const transformFromWcfDate = (wcfDate) => {
    const timestamp = parseInt(wcfDate.replace(/\/Date\((.*?)\)\//, '$1'), 10);
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };