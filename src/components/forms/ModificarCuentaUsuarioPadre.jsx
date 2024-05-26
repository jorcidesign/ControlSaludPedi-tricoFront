import React from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Cookies from 'universal-cookie';

export default function ModifyParentAccountForm({ handleSubmit }) {
  const cookies = new Cookies();
  const userData = cookies.get('user');
  const { padre } = userData;

  const [firstName, setFirstName] = React.useState(padre.nombre || '');
  const [lastName, setLastName] = React.useState(padre.apellido || '');
  const [dni, setDni] = React.useState(padre.dni || '');
  const [gender, setGender] = React.useState(padre.genero || '');
  const [birthDate, setBirthDate] = React.useState(dayjs(padre.fechaNacimiento) || dayjs());
  const [email, setEmail] = React.useState(userData.email || '');
  const [password, setPassword] = React.useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (handleSubmit) {
      handleSubmit({
        firstName,
        lastName,
        dni,
        gender,
        birthDate: birthDate.format('YYYY-MM-DD'),
        email,
        password
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3, maxWidth: 600 }}>
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="gender"
              label="Género"
              name="gender"
              autoComplete="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Nacimiento"
                value={birthDate}
                onChange={(newValue) => setBirthDate(newValue)}
                renderInput={(params) => <TextField {...params} required />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
    </Box>
  );
}
