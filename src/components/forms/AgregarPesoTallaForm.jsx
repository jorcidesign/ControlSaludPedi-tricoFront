import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';

export default function WeightHeightForm({ onSubmit }) {
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [date, setDate] = React.useState(dayjs());

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit({ weight, height, date: date.format('YYYY-MM-DD') });
    }
    setWeight("");
    setHeight("");
    setDate(dayjs());
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 300,
        margin: "auto",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Peso (kg)"
        variant="outlined"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="end">kg</InputAdornment>,
        }}
        required
      />
      <TextField
        label="Talla (cm)"
        variant="outlined"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
        }}
        required
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fecha"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          renderInput={(params) => <TextField {...params} required />}
        />
      </LocalizationProvider>
      <Button type="submit" variant="contained" color="primary">
        Agregar Registro
      </Button>
    </Box>
  );
}