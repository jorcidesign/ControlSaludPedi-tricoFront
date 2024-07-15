import { createTheme } from '@mui/material/styles';

// Crea un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#00a3e0', // Nuevo color azul
    },
    secondary: {
      main: '#dc004e', // Color secundario
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      fontSize: '1rem', // Ajusta el tamaño de la fuente del botón
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Desactiva la transformación del texto a mayúsculas
          borderRadius: 50, // Bordes redondeados
          height: '56px', // Altura consistente con los campos de texto
          color: '#ffffff', // Color de la fuente blanco
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Bordes redondeados para los campos de texto
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Bordes redondeados para los selectores
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // Bordes redondeados para los campos de texto
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#f5f5f5', // Color de fondo del drawer
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#00a3e0', // Color de los íconos en el drawer
        },
      },
    },
  },
});

export default theme;
