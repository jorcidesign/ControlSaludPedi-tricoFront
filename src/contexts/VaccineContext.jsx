// src/contexts/VaccineContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { obtenerVacunasPorPerfilPaciente } from '../services/api';

const VaccineContext = createContext();

export const useVaccine = () => {
  return useContext(VaccineContext);
};

export const VaccineProvider = ({ children }) => {
  const [vacunas, setVacunas] = useState([]);

  useEffect(() => {
    const fetchVacunas = async () => {
      const cookies = new Cookies();
      const perfilActivo = cookies.get('perfilActivo');
      if (perfilActivo) {
        try {
          const response = await obtenerVacunasPorPerfilPaciente(perfilActivo.id);
          if (response.Success && response.RegistrosMedicos) {
            setVacunas(response.RegistrosMedicos);
          }
        } catch (error) {
          console.error('Error fetching vacunas:', error);
        }
      }
    };

    fetchVacunas();
  }, []);

  return (
    <VaccineContext.Provider value={{ vacunas }}>
      {children}
    </VaccineContext.Provider>
  );
};
