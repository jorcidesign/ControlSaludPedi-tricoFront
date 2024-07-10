import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Material-UI Components
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Snackbar,
  InputAdornment,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// React Hook Form and Yup
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// Assets and Services
import logo from "../assets/logoSoftwareControlSalud-transformed.png";
import { registrarUsuario } from "../services/api";
import { transformToWcfDate } from "../utils/helpers";
import {
  validationSchema,
  calculatePasswordStrength,
} from "../utils/validations"; // Importar esquema de validación

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RegisterPage() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      birthDate: null,
    },
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  
  const onSubmit = async (data) => {
    const userData = {
      usuario: {
        email: data.email,
        contrasena: data.password,
        perfilPaciente: [],
        padre: {
          nombre: data.firstName,
          apellido: data.lastName,
          dni: data.dni,
          genero: data.gender === "masculino" ? "M" : "F",
          fechaNacimiento: transformToWcfDate(data.birthDate), // Transforma la fecha al formato \/Date(...)\/
        },
      },
    };
  
    const handleError = (error) => {
      if (error.message.includes('duplicate key value violates unique constraint "usuarios_email_key"')) {
        setMessage("Ya existe un usuario registrado con este correo");
      } else {
        setMessage(`Error: ${error.message}`);
      }
      setSeverity("error");
      setOpen(true);
      console.error("Error al enviar la solicitud:", error.message);
    };
  
    try {
      const response = await registrarUsuario(userData);
  
      if (response && response.Success) {
        setMessage("Usuario registrado con éxito. Redirigiendo a la página de inicio de sesión...");
        setSeverity("success");
        setOpen(true);
  
        // Esperar 1 segundo antes de redirigir
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(new Error(response.Message));
      }
    } catch (error) {
      handleError(error);
    }
  };
  
  

  const password = watch("password", "");

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, width: 180, height: 180 }}>
            <img src={logo} alt="logo" style={{ width: "100%" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Regístrate
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Nombre"
                      autoComplete="given-name"
                      error={!!errors.firstName}
                      helperText={
                        errors.firstName ? errors.firstName.message : ""
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Apellido"
                      autoComplete="family-name"
                      error={!!errors.lastName}
                      helperText={
                        errors.lastName ? errors.lastName.message : ""
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="dni"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="DNI"
                      autoComplete="dni"
                      error={!!errors.dni}
                      helperText={errors.dni ? errors.dni.message : ""}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!errors.gender}>
                  <InputLabel id="gender-label">Género</InputLabel>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="gender-label"
                        id="gender"
                        label="Género"
                      >
                        <MenuItem value="masculino">Masculino</MenuItem>
                        <MenuItem value="femenino">Femenino</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.gender && (
                    <FormHelperText>{errors.gender.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="birthDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="date"
                      label="Fecha de Nacimiento"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.birthDate}
                      helperText={
                        errors.birthDate ? errors.birthDate.message : ""
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      autoComplete="email"
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Contraseña"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      error={!!errors.password}
                      helperText={
                        errors.password ? errors.password.message : ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <LinearProgress
                  variant="determinate"
                  value={calculatePasswordStrength(password)}
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container>
              <Grid item>
                <Link href="login" variant="body2">
                  {"Ya tengo una cuenta. Iniciar sesión"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
