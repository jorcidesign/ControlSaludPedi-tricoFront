import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { agregarVacuna } from '../../services/api';
import Cookies from 'universal-cookie';

const AgregarVacunaForm = ({ vacuna }) => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [open, setOpen] = useState(false);
  const [perfilPacienteId, setPerfilPacienteId] = useState(null);

  const cookies = new Cookies();

  useEffect(() => {
    const user = cookies.get('perfilActivo');
    if (user) {
      setPerfilPacienteId(user.id);
    }
  }, []);

  const onSubmit = async (data) => {
    const vacunaData = {
      Vacuna: {
        Nombre: vacuna,
        Descripcion: data.descripcion,
      },
      EsquemaVacunacion: [
        {
          PerfilPacienteId: perfilPacienteId,
          FechaAplicacion: `/Date(${new Date(data.fechaAplicacion).getTime()})/`,
          Estado: 1,
        },
      ],
    };

    try {
      await agregarVacuna(vacunaData);
      setMessage('Vacuna registrada con éxito');
      setSeverity('success');
      setOpen(true);
      reset();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setSeverity('error');
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Typography component="h1" variant="h5">
        Registrar Vacuna: {vacuna}
      </Typography>
      <Controller
        name="descripcion"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Descripción"
            error={!!errors.descripcion}
            helperText={errors.descripcion ? 'La descripción es obligatoria' : ''}
            sx={{ my: 2 }}
          />
        )}
        rules={{ required: true }}
      />
      <Controller
        name="fechaAplicacion"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Fecha de Aplicación"
            type="date"
            InputLabelProps={{ shrink: true }}
            error={!!errors.fechaAplicacion}
            helperText={errors.fechaAplicacion ? 'La fecha es obligatoria' : ''}
            sx={{ my: 2 }}
          />
        )}
        rules={{ required: true }}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Registrar Vacuna
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AgregarVacunaForm;
