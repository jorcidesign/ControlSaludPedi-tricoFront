import React from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';

export default function ModifyParentAccountForm({ handleSubmit }) {
  return (
    <Box
      sx={{
        // marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        width: '100%',
      }}
    >
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 600 }}>
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
            <TextField
              required
              fullWidth
              id="gender"
              label="Género"
              name="gender"
              autoComplete="gender"
            />
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
          Guardar Cambios
        </Button>
      </Box>
    </Box>
  );
}
