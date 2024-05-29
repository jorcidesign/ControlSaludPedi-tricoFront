// Home.js
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import PermanentDrawerLeft from "../components/common/Sidebar";
import MenuAppBar from "../components/common/Header";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Cookies from 'universal-cookie'; // Importa universal-cookie
import { usePerfil } from "../contexts/PerfilContext";

export default function Home() {
  const [user, setUser] = useState(null);
  const { perfilActivo } = usePerfil();
  const cookies = new Cookies(); // Instancia de cookies

  useEffect(() => {
    const userData = cookies.get('user');
    if (userData) {
      setUser(userData.padre);
    }
  }, []); // Asegúrate de que el arreglo de dependencias esté vacío

  if (!user) {
    return <div>Cargando...</div>;
  }

  const { nombre } = user;

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
            {perfilActivo ? (
              <Typography variant="h5" gutterBottom>
                Bienvenido, <span style={{ fontWeight: "bold" }}>{nombre}</span>
                . Actualmente estás en el perfil de tu hij@:{" "}
                <span style={{ fontWeight: "bold" }}>{perfilActivo.nombre}</span>.
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
