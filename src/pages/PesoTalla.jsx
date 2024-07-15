import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import PermanentDrawerLeft from "../components/common/Sidebar";
import MenuAppBar from "../components/common/Header";
import ColumnGroupingTable from "../components/tables/TablaPesoTalla";
import WeightHeightForm from "../components/forms/AgregarPesoTallaForm";
import { RegistroMedicoProvider } from '../contexts/RegistroMedicoContext';

export default function PesoTallaPage() {
  return (
    <RegistroMedicoProvider>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MenuAppBar pageTitle="Registrar Peso y Talla" />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <PermanentDrawerLeft sx={{ width: "240px" }} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            marginLeft: "10px", // Ajuste del margen izquierdo
            marginRight: "10px", // Ajuste del margen derecho
          }}
        >
          <Toolbar />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <WeightHeightForm />
                </Grid>
                <Grid item>
                  <ColumnGroupingTable />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
    </RegistroMedicoProvider>
  );
}
