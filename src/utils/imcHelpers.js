// src/utils/imcHelpers.js

// Función para calcular el Z-score
const calcularZScore = (valor, media, desviacionEstandar) => {
    return (valor - media) / desviacionEstandar;
  };
  
  // Función para calcular el percentil a partir del Z-score
  const calcularPercentil = (z) => {
    return 0.5 * (1 + erf(z / Math.sqrt(2)));
  };
  
  // Función de error para calcular el CDF de la distribución normal
  const erf = (x) => {
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  };
  
  // Función para obtener los percentiles de IMC
  const obtenerPercentilesIMC = (imc, edad, sexo) => {
    // Valores de ejemplo, reemplazar con valores reales
    const mediaIMC = 18.0; // Media de IMC para la edad y el sexo específicos
    const desviacionEstandarIMC = 2.0; // Desviación estándar de IMC para la edad y el sexo específicos
  
    const zScore = calcularZScore(imc, mediaIMC, desviacionEstandarIMC);
    const percentil = calcularPercentil(zScore) * 100;
  
    return percentil;
  };
  
 // Función para calcular el IMC
export const calcularIMC = (peso, altura) => {
    return (peso / (altura * altura)).toFixed(2);
  };
  
  // Función para evaluar el IMC
  export const evaluarIMC = (imc, edad, sexo) => {
    const percentilIMC = obtenerPercentilesIMC(imc, edad, sexo);
  
    if (percentilIMC < 5) {
      return 'bajo';
    } else if (percentilIMC >= 85 && percentilIMC < 95) {
      return 'alto';
    } else if (percentilIMC >= 95) {
      return 'muy alto';
    }
    return 'normal';
  };