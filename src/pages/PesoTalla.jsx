import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import PermanentDrawerLeft from "../components/common/Sidebar";
import MenuAppBar from "../components/common/Header";
import ColumnGroupingTable from "../components/tables/TablaPesoTalla";
import WeightHeightForm from "../components/forms/AgregarPesoTallaForm";

export default function PesoTallaPage() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MenuAppBar pageTitle="Configuración de la cuenta" />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <PermanentDrawerLeft />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <ColumnGroupingTable/>
            <WeightHeightForm/>
        </Box>
      </Box>
    </Box>
  );
}