// src/components/VaccineSchedule.jsx

import React, { useState, useEffect } from 'react';
import { Box, Grid, Modal, Typography } from '@mui/material';
import AgregarVacunaForm from './forms/AgregarVacunaForm';
import { useVaccine } from '../contexts/VaccineContext';
import Cookies from 'universal-cookie';
import { obtenerVacunasPorPerfilPaciente } from '../services/api';

const VaccineSchedule = ({ schedule }) => {
  const [open, setOpen] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const { vacunas, setVacunas } = useVaccine();

  const cookies = new Cookies();
  const perfilActivo = cookies.get('perfilActivo');

  useEffect(() => {
    const fetchVacunas = async () => {
      if (perfilActivo) {
        try {
          const response = await obtenerVacunasPorPerfilPaciente({ PerfilPacienteId: perfilActivo.id });
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

  const handleOpen = (vaccine) => {
    setSelectedVaccine(vaccine);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVaccine(null);
  };

  const isVaccineInProfile = (vacunaNombre) => {
    return vacunas.some((vacuna) => vacuna.Nombre.toLowerCase() === vacunaNombre.toLowerCase());
  };

  useEffect(() => {
    console.log('Vacunas en el perfil:', vacunas); // Agregar console.log aquí para verificar las vacunas en el perfil
  }, [vacunas]);

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Grid container spacing={2} sx={{ minWidth: '1200px' }}>
        {schedule.map((ageGroup) => (
          <Grid item key={ageGroup.edad} xs={12} md={4} lg={3}>
            <Typography variant="h6" gutterBottom>
              {ageGroup.edad}
            </Typography>
            {ageGroup.vacunas.map((vacuna) => (
              <Box
                key={vacuna.nombre}
                sx={{
                  padding: 2,
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  textAlign: 'center',
                  position: 'relative',
                  backgroundColor: isVaccineInProfile(vacuna.nombre) ? 'green' : 'gray',
                  cursor: isVaccineInProfile(vacuna.nombre) ? 'not-allowed' : 'pointer',
                  '&:hover': {
                    backgroundColor: isVaccineInProfile(vacuna.nombre) ? 'green' : '#e0e0e0',
                  }
                }}
                onClick={() => !isVaccineInProfile(vacuna.nombre) && handleOpen(vacuna)}
              >
                <Typography variant="body1">{vacuna.nombre}</Typography>
              </Box>
            ))}
          </Grid>
        ))}
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', maxWidth: 500 }}>
          <AgregarVacunaForm vacuna={selectedVaccine?.nombre} />
        </Box>
      </Modal>
    </Box>
  );
};

export default VaccineSchedule;
