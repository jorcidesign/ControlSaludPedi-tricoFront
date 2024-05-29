import React, { useState } from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Cookies from 'universal-cookie';
import { transformFromWcfDate, transformToWcfDate } from '../../utils/helpers';
import * as Yup from 'yup';
import { modificarDatosUsuario } from '../../services/api';

//Validación de Formulario con YUP
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('El apellido es obligatorio'),
  dni: Yup.string().required('El DNI es obligatorio'),
  gender: Yup.string().required('El género es obligatorio'),
  birthDate: Yup.date().required('La fecha de nacimiento es obligatoria'),
  email: Yup.string().email('El email es inválido').required('El email es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria')
});

//Creación del objeto de alerta 
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ModifyParentAccountForm({ handleSubmit: onSubmit }) {
  //uso de cookies
  const cookies = new Cookies();
  const userData = cookies.get('user');
  const { padre } = userData;

  //Mensajes de succes o de error
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  //Pintar en el formulario los datos del usuario padre logueado
  const defaultValues = {
    firstName: padre.nombre || '',
    lastName: padre.apellido || '',
    dni: padre.dni || '',
    gender: padre.genero || '',
    birthDate: transformFromWcfDate(padre.fechaNacimiento) || '',
    email: userData.email || '',
    password: '', // La contraseña no se debe pre-llenar por razones de seguridad
  };

  //validación de YUP
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema)
  });

  //Enviar la data al backend para modificar el usuario Padre
  const handleFormSubmit = async (data) => {
    const updateUser = {
      usuarioId: userData.id,
      email: data.email,
      contrasena: data.password,
      padre: {
        id: padre.id,
        nombre: data.firstName,
        apellido: data.lastName,
        dni: data.dni,
        genero: data.gender,
        fechaNacimiento: transformToWcfDate(data.birthDate)
      }
    };

    try {
      const response = await modificarDatosUsuario(updateUser);
      if (response && response.success) {
        setSnackbarMessage('Datos modificados con éxito');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } else {
        throw new Error('Error al actualizar los datos');
      }
    } catch (error) {
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      console.error('Error al actualizar los datos:', error.message);
    }
  };

  //cerrar el mensaje de succes o error presionando la "X"
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box component="form" noValidate onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3, maxWidth: 600 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Nombre"
                  autoComplete="given-name"
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Apellido"
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="dni"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="DNI"
                  autoComplete="dni"
                  error={!!errors.dni}
                  helperText={errors.dni ? errors.dni.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Género"
                  autoComplete="gender"
                  error={!!errors.gender}
                  helperText={errors.gender ? errors.gender.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="date"
                  label="Fecha de Nacimiento"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.birthDate}
                  helperText={errors.birthDate ? errors.birthDate.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Contraseña"
                  type="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              )}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Guardar Cambios
        </Button>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
