import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';

export default function ChildProfileForm({ onSubmit }) {
  const [name, setName] = React.useState('');
  const [birthDate, setBirthDate] = React.useState(dayjs());
  const [dni, setDni] = React.useState('');
  const [gender, setGender] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit({ name, birthDate: birthDate.format('YYYY-MM-DD'), dni, gender });
    }
    setName('');
    setBirthDate(dayjs());
    setDni('');
    setGender('');
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
        // margin: 'auto',
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Nombre"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="DNI"
        variant="outlined"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        required
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fecha de Nacimiento"
          value={birthDate}
          onChange={(newValue) => setBirthDate(newValue)}
          renderInput={(params) => <TextField {...params} required />}
        />
      </LocalizationProvider>
      <TextField
        select
        label="Género"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        variant="outlined"
        required
      >
        <MenuItem value="male">Masculino</MenuItem>
        <MenuItem value="female">Femenino</MenuItem>
        <MenuItem value="other">Otro</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Crear Perfil
      </Button>
    </Box>
  );
}
