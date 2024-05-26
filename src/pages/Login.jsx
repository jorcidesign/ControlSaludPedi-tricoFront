import * as React from 'react';
import { useState } from 'react';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import logo from '../assets/logoSoftwareControlSalud-transformed.png';
import { iniciarSesion } from '../services/api';
import Cookies from 'universal-cookie';

const theme = createTheme();

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // State to control the Snackbar
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    console.log("entro al handle submit");
    try {
      console.log("entro al try del login");

      const response = await iniciarSesion(email, password);
      console.log(response.Usuario);
      
      if (response && response.Usuario) {
        // Guarda la información del usuario en cookies
        cookies.set('user', response.Usuario, { path: '/' });

        // Redirige al usuario al Home
        navigate('/');
      } else {
        // Si la respuesta no tiene el usuario, lanza un error
        throw new Error('Datos de inicio de sesión incorrectos');
      }
    } catch (error) {
      console.log(error.message);
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
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
