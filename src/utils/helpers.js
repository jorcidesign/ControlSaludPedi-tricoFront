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
  const timestamp = parseInt(wcfDate.replace(/\/Date\((.*?)\)\//, "$1"), 10);
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
};

export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let ageYears = today.getFullYear() - birth.getFullYear();
  let ageMonths = today.getMonth() - birth.getMonth();

  if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birth.getDate())) {
    ageYears--;
    ageMonths += 12;
  }

  if (today.getDate() < birth.getDate()) {
    ageMonths--;
  }

  return { ageYears, ageMonths };
};

export const calculateBMI = (weight, height) => {
    if (!weight || !height) {
      throw new Error('Weight and height must be provided');
    }
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(2));
  };

  /**
 * Calcula la diferencia en meses entre dos fechas
 * @param {Date} startDate - La fecha de inicio
 * @param {Date} endDate - La fecha de fin
 * @returns {number} - La diferencia en meses
 */
export const calculateMonthsDifference = (startDate, endDate) => {
    return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
  };

  /**
 * Convierte la edad en meses a años con decimales
 * @param {number} months - La edad en meses
 * @returns {number} - La edad en años con decimales
 */
export const monthsToYears = (months) => {
    return (months / 12).toFixed(1);
  };