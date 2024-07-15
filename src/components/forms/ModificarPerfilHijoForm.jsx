import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Cookies from 'universal-cookie';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { modificarDatosPaciente, eliminarPerfilPaciente, listarPacientesPorUsuario } from '../../services/api';
import { transformToWcfDate, calculateAge, transformFromWcfDate } from '../../utils/helpers';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  fechaNacimiento: Yup.date().required('La fecha de nacimiento es obligatoria'),
  dni: Yup.string().required('El DNI es obligatorio'),
  genero: Yup.string().required('El género es obligatorio'),
});

const ChildProfileModifyForm = () => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alertType, setAlertType] = React.useState('success');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const perfilActivo = cookies.get('perfilActivo');
  const userData = cookies.get('user');

  const { handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nombre: perfilActivo?.nombre || '',
      fechaNacimiento: perfilActivo ? transformFromWcfDate(perfilActivo.fechaNacimiento) : '',
      dni: perfilActivo?.dni || '',
      genero: perfilActivo?.genero || '',
    },
  });

  const onSubmit = async (data) => {
    const { ageYears, ageMonths } = calculateAge(data.fechaNacimiento);
    const perfilPaciente = {
      ...data,
      fechaNacimiento: transformToWcfDate(data.fechaNacimiento),
      edadAnios: ageYears,
      edadMeses: ageMonths,
    };

    try {
      await modificarDatosPaciente(perfilActivo.id, perfilPaciente);
      const perfilesResponse = await listarPacientesPorUsuario(userData.id);
      if (perfilesResponse.Perfiles) {
        cookies.set('perfiles', perfilesResponse.Perfiles, { path: '/' });
        cookies.set('perfilActivo', perfilesResponse.Perfiles.find(p => p.id === perfilActivo.id) || perfilesResponse.Perfiles[0], { path: '/' });
      }
      setAlertType('success');
      setAlertMessage('Perfil modificado exitosamente');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Error modificando perfil');
      setOpenSnackbar(true);
      console.error('Error modificando perfil:', error.message);
    }
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await eliminarPerfilPaciente(perfilActivo.id);
      const perfilesResponse = await listarPacientesPorUsuario(userData.id);
      if (perfilesResponse.Perfiles) {
        cookies.set('perfiles', perfilesResponse.Perfiles, { path: '/' });
        const newPerfilActivo = perfilesResponse.Perfiles.length > 0 ? perfilesResponse.Perfiles[0] : null;
        cookies.set('perfilActivo', newPerfilActivo, { path: '/' });
      } else {
        cookies.remove('perfilActivo', { path: '/' });
      }
      setAlertType('success');
      setAlertMessage('Perfil eliminado exitosamente');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Error eliminando perfil');
      setOpenSnackbar(true);
      console.error('Error eliminando perfil:', error.message);
    }
    setOpenDialog(false);
  };

  const fechaNacimiento = watch('fechaNacimiento');

  const [edad, setEdad] = React.useState({ ageYears: perfilActivo?.edadAnios || 0, ageMonths: perfilActivo?.edadMeses || 0 });

  React.useEffect(() => {
    if (fechaNacimiento) {
      const { ageYears, ageMonths } = calculateAge(fechaNacimiento);
      setEdad({ ageYears, ageMonths });
      setValue('edadAnios', ageYears);
      setValue('edadMeses', ageMonths);
    }
  }, [fechaNacimiento, setValue]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 300,
        mt: 3,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="nombre"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre"
            variant="outlined"
            fullWidth
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
          />
        )}
      />
      <Controller
        name="dni"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="DNI"
            variant="outlined"
            fullWidth
            error={!!errors.dni}
            helperText={errors.dni?.message}
          />
        )}
      />
      <Controller
        name="fechaNacimiento"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Fecha de Nacimiento"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.fechaNacimiento}
            helperText={errors.fechaNacimiento?.message}
          />
        )}
      />
      <Controller
        name="genero"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Género"
            fullWidth
            variant="outlined"
            error={!!errors.genero}
            helperText={errors.genero?.message}
          >
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Femenino">Femenino</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
          </TextField>
        )}
      />
      <Typography variant="h6" gutterBottom>
        Edad: {edad.ageYears} Años, {edad.ageMonths} Meses
      </Typography>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Modificar Perfil
      </Button>
      <Button variant="contained" color="error" onClick={handleDelete} fullWidth>
        Eliminar Perfil
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MuiAlert onClose={handleCloseSnackbar} severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}
        </MuiAlert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmación de eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este perfil?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChildProfileModifyForm;
