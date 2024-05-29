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
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { usePerfil } from '../../contexts/PerfilContext';

export default function MenuAppBar({ pageTitle }) {
  const drawerWidth = 240;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profiles, setProfiles] = React.useState([]);
  const cookies = new Cookies();
  const { perfilActivo, setPerfilActivo } = usePerfil();
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = cookies.get('user');
    const perfiles = cookies.get('perfiles');
    const perfilActivoCookie = cookies.get('perfilActivo');

    if (user && perfiles) {
      setProfiles(perfiles);
      setPerfilActivo(perfilActivoCookie || perfiles[0]);
    }
  }, [setPerfilActivo]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileChange = (profile) => {
    setPerfilActivo(profile);
    cookies.set('perfilActivo', profile, { path: '/' });
    handleClose();
    navigate('/'); // Redirige al home después de cambiar el perfil
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          {profiles.length > 0 ? (
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
                  {perfilActivo ? perfilActivo.nombre : profiles[0].nombre}
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
                  <MenuItem key={profile.id} onClick={() => handleProfileChange(profile)}>
                    {profile.nombre}
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
