// src/pages/Vacunas.jsx

import React, { useEffect } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import PermanentDrawerLeft from '../components/common/Sidebar';
import MenuAppBar from '../components/common/Header';
import VaccineSchedule from '../components/VaccineSchedule';
import { VaccineProvider, useVaccine } from '../contexts/VaccineContext';
import vaccineData from '../data/vaccineData.json'; // Asegúrate de tener el JSON con las vacunas en esta ruta
import Cookies from 'universal-cookie';
import { obtenerVacunasPorPerfilPaciente } from '../services/api';

const VacunasPageContent = () => {
  const { setVacunas } = useVaccine();
  const cookies = new Cookies();
  const perfilActivo = cookies.get('perfilActivo');

  useEffect(() => {
    const fetchVacunas = async () => {
      if (perfilActivo) {
        try {
          const response = await obtenerVacunasPorPerfilPaciente( perfilActivo.id );
          if (response.Success && response.RegistrosMedicos) {
            setVacunas(response.RegistrosMedicos);
          }
        } catch (error) {
          console.error('Error fetching vacunas:', error);
        }
      }
    };

    fetchVacunas();
  }, [perfilActivo, setVacunas]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MenuAppBar pageTitle="Esquema de Vacunación" />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <PermanentDrawerLeft />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <VaccineSchedule schedule={vaccineData} />
        </Box>
      </Box>
    </Box>
  );
};

const VacunasPage = () => {
  return (
    <VaccineProvider>
      <VacunasPageContent />
    </VaccineProvider>
  );
};

export default VacunasPage;
