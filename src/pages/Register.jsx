import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import logo from '../assets/logoSoftwareControlSalud-transformed.png';
import { registrarUsuario } from '../services/api';

const theme = createTheme();


export default function RegisterPage() {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      usuario: {
        email: data.get('email'),
        contrasena: data.get('password'),
        perfilPaciente: [],
        padre: {
          nombre: data.get('firstName'),
          apellido: data.get('lastName'),
          dni: data.get('dni'),
          genero: data.get('gender') === 'masculino' ? 'M' : 'F',
          fechaNacimiento: data.get('birthDate') // Ensure it's in the format YYYY-MM-DD
        }
      }
    };

    try {
      console.log("entro al try del register");
      
      // console.log('Respuesta del servidor:', response);

      // if (response && response.Success) {
      //   // Redirige al usuario a la página de login después de un registro exitoso
      //   navigate('/login');
      // } else {
      //   // Si la respuesta no tiene Success, lanza un error
      //   throw new Error('Datos de registro incorrectos');
      // }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error.message);
      setError('Error al registrar usuario');
      setOpen(true);
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
            Regístrate
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dni"
                  label="DNI"
                  name="dni"
                  autoComplete="dni"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="gender-label">Género</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    label="Género"
                    defaultValue=""
                  >
                    <MenuItem value="masculino">Masculino</MenuItem>
                    <MenuItem value="femenino">Femenino</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="birthDate"
                  label="Fecha de Nacimiento"
                  name="birthDate"
                  autoComplete="birthDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container>
              <Grid item>
                <Link href="login" variant="body2">
                  {"Ya tengo una cuenta. Iniciar sesión"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
        
      </Container>
    </ThemeProvider>
  );
}
