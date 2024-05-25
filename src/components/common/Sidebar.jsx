import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ScaleIcon from '@mui/icons-material/Scale';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import logo from '../../assets/logoSoftwareControlSalud-transformed.png'; // Ajusta la ruta según sea necesario

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#f5f5f5',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#1976d2',
        },
      },
    },
  },
});

export default function PermanentDrawerLeft() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
          }}
        >
          <img src={logo} alt="Logo" style={{ width: '80%', height: 'auto' }} />
        </Box>
        <Divider />
        <List>
          <ListItem key="Inicio" disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Peso y Talla" disablePadding>
            <ListItemButton component={Link} to="/peso-talla">
              <ListItemIcon>
                <ScaleIcon />
              </ListItemIcon>
              <ListItemText primary="Peso y Talla" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Gráfico IMC" disablePadding>
            <ListItemButton component={Link} to="/imc">
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Gráfico IMC" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key="Perfil" disablePadding>
            <ListItemButton component={Link} to="/modificar-perfil-hijo">
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Configuración" disablePadding>
            <ListItemButton component={Link} to="/config-cuenta-padre">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configuración" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Cerrar Sesión" disablePadding>
            <ListItemButton component={Link} to="/login">
              <ListItemIcon>
                <ExitToAppIcon style={{ color: 'red' }} />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" style={{ color: 'red' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
}
