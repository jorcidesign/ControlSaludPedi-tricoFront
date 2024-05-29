import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../assets/logoSoftwareControlSalud-transformed.png';
import { iniciarSesion, listarPacientesPorUsuario } from '../services/api';
import Cookies from 'universal-cookie';
import md5 from 'crypto-js/md5';

const theme = createTheme();

// Schema de validación con Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('El email es inválido').required('El email es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria')
});

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // State to control the Snackbar
  const navigate = useNavigate();
  const cookies = new Cookies();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await iniciarSesion(data.email, data.password);

      if (response && response.Usuario) {
        // Encripta la contraseña
        response.Usuario.contrasena = md5(response.Usuario.contrasena).toString();

        // Guarda la información del usuario en cookies
        cookies.set('user', response.Usuario, { path: '/' });

        // Llamar al servicio para obtener los perfiles de los hijos
        const perfilesResponse = await listarPacientesPorUsuario(response.Usuario.id);
        if (perfilesResponse && perfilesResponse.Success) {
          const perfiles = perfilesResponse.Perfiles;
          cookies.set('perfiles', perfiles, { path: '/' });

          if (perfiles.length > 0) {
            // Establecer el primer perfil como el perfil activo
            cookies.set('perfilActivo', perfiles[0], { path: '/' });
          }
        }

        // Redirige al usuario al Home
        navigate('/');
      } else {
        // Si la respuesta no tiene el usuario, lanza un error
        throw new Error('Datos de inicio de sesión incorrectos');
      }
    } catch (error) {
      setError("Datos de inicio de sesión incorrectos"); // Mensaje de error personalizado
      setOpen(true); // Open the Snackbar
    }
  };

  // Handle closing the Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, width: 180, height: 180 }}>
            <img src={logo} alt="logo" style={{ width: '100%' }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item>
                <Link href="register" variant="body2">
                  {"¿No se encuentra registrado?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Set position to top-right
        >
          <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </MuiAlert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
