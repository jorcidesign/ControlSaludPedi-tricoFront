import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function MenuAppBar({ pageTitle }) {
  const drawerWidth = 240;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Simulación de variables para tener perfiles registrados
  const hasProfile = true;
  const profiles = ["Pedro", "María"]; // Lista de perfiles de hijos registrados

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          {hasProfile ? (
            <div>
              <IconButton
                size="large"
                aria-label="current profile"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {profiles[0]} {/* Nombre del perfil del primer hijo registrado */}
                </Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {profiles.map((profile) => (
                  <MenuItem key={profile} onClick={() => handleProfileChange(profile)}>
                    {profile}
                  </MenuItem>
                ))}
                <MenuItem component={Link} to="/agregar-perfil-hijo" onClick={handleClose}>
                  + Agregar perfil
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button component={Link} to="/agregar-perfil-hijo" variant="outlined" color="inherit" startIcon={<AddIcon />}>
              Agregar Perfil
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
