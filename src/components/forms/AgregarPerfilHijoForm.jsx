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
import { useNavigate } from 'react-router-dom';
import { agregarPerfilPaciente, listarPacientesPorUsuario } from '../../services/api';
import { transformToWcfDate } from '../../utils/helpers';
import { calculateAge } from '../../utils/helpers';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  fechaNacimiento: Yup.date().required('La fecha de nacimiento es obligatoria'),
  dni: Yup.string().required('El DNI es obligatorio'),
  genero: Yup.string().required('El género es obligatorio'),
});

const ChildProfileForm = () => {
  const [open, setOpen] = React.useState(false); // Snackbar state
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userData = cookies.get('user');

  const { handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
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
      await agregarPerfilPaciente(userData.id, perfilPaciente);
      setOpen(true);
      setTimeout(async () => {
        const perfilesResponse = await listarPacientesPorUsuario(userData.id);
        if (perfilesResponse.Perfiles) {
          cookies.set('perfiles', perfilesResponse.Perfiles, { path: '/' });
          cookies.set('perfilActivo', perfilesResponse.Perfiles[perfilesResponse.Perfiles.length - 1], { path: '/' });
          navigate('/');
        }
      }, 1000);
    } catch (error) {
      console.error('Error agregando perfil:', error.message);
    }
  };

  const fechaNacimiento = watch('fechaNacimiento');

  const [edad, setEdad] = React.useState({ ageYears: 0, ageMonths: 0 });

  React.useEffect(() => {
    if (fechaNacimiento) {
      const { ageYears, ageMonths } = calculateAge(fechaNacimiento);
      setEdad({ ageYears, ageMonths });
      setValue('edadAnios', ageYears);
      setValue('edadMeses', ageMonths);
    }
  }, [fechaNacimiento, setValue]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 300,
        mt: 3
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
          </TextField>
        )}
      />
      <Typography variant="h6" gutterBottom>
        Edad: {edad.ageYears} Años, {edad.ageMonths} Meses
      </Typography>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Crear Perfil
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Perfil agregado exitosamente
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default ChildProfileForm;
