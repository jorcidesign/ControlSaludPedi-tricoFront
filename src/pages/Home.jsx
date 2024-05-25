import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import PermanentDrawerLeft from "../components/common/Sidebar";
import MenuAppBar from "../components/common/Header";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

// Datos simulados para el ejemplo
const user = {
  nombre: "Juan",
//   perfilHijo: {
//     nombre: "Pedro",
//   },
    perfilHijo: null,// Cambia a null si no hay perfil de hijo creado
};

export default function Home() {
  const { nombre, perfilHijo } = user;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MenuAppBar pageTitle="Inicio" />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <PermanentDrawerLeft />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Box sx={{ p: 2 }}>
            {perfilHijo ? (
              <Typography variant="h5" gutterBottom>
                Bienvenido, <span style={{ fontWeight: "bold" }}>{nombre}</span>
                . Actualmente estás en el perfil de tu hij@:{" "}
                <span style={{ fontWeight: "bold" }}>{perfilHijo.nombre}.</span>
              </Typography>
            ) : (
              <Typography variant="h5" gutterBottom>
                Bienvenido, <span style={{ fontWeight: "bold" }}>{nombre}</span>
                . Crea el primer perfil de tu hijo{" "}
                <Link to="/agregar-perfil-hijo">aquí</Link>.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
