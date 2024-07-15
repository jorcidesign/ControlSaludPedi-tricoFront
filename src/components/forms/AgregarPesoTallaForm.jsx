import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Cookies from "universal-cookie";
import {
  agregarRegistroMedico,
  listarRegistroMedicoPorPerfilPaciente,
} from "../../services/api";
import { transformToWcfDate, transformFromWcfDate } from "../../utils/helpers";
import { useRegistroMedico } from "../../contexts/RegistroMedicoContext";

const validationSchema = Yup.object().shape({
  fecha: Yup.date().required("La fecha es obligatoria"),
  peso: Yup.number()
    .required("El peso es obligatorio")
    .positive("El peso debe ser positivo"),
  talla: Yup.number()
    .required("La talla es obligatoria")
    .positive("La talla debe ser positiva"),
});

const WeightHeightForm = () => {
  const cookies = new Cookies();
  const perfilActivo = cookies.get("perfilActivo");
  const { registros, setRegistros } = useRegistroMedico();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    const registroMedico = {
      fecha: transformToWcfDate(data.fecha),
      datos: {
        peso: data.peso,
        talla: data.talla,
      },
    };

    try {
      const response = await agregarRegistroMedico(
        perfilActivo.id,
        registroMedico
      );
      console.log("Registro médico agregado exitosamente:", response);

      // Actualiza el estado de éxito antes de abrir el Snackbar
      setSuccess(true);
      setOpen(true);

      // Fetch updated registros
      const registrosResponse = await listarRegistroMedicoPorPerfilPaciente(
        perfilActivo.id
      );
      if (registrosResponse.Success && registrosResponse.RegistrosMedicos) {
        const fetchedRows = registrosResponse.RegistrosMedicos.map(
          (registro) => ({
            id: registro.registroMedicoId,
            date: transformFromWcfDate(registro.fecha),
            weight: registro.datos.peso,
            height: registro.datos.talla,
          })
        );
        setRegistros(fetchedRows);
      }
    } catch (error) {
      console.error("Error agregando registro médico:", error.message);
      setSuccess(false);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 300,
        mt: 3,
        margin: "auto",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="fecha"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Fecha"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.fecha}
            helperText={errors.fecha?.message}
          />
        )}
      />
      <Controller
        name="peso"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Peso (kg)"
            variant="outlined"
            fullWidth
            error={!!errors.peso}
            helperText={errors.peso?.message}
          />
        )}
      />
      <Controller
        name="talla"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Talla (cm)"
            variant="outlined"
            fullWidth
            error={!!errors.talla}
            helperText={errors.talla?.message}
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Agregar Registro
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleClose}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {success
            ? "Registro agregado exitosamente"
            : "Error agregando registro"}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default WeightHeightForm;
