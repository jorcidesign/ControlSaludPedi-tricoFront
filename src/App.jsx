import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AgregarPerfilHijo from './pages/AgregarPerfilHijo';
import ConfigCuentaPadre from './pages/ConfigCuentaPadre';
import Home from './pages/Home';
import IMC from './pages/IMC';
import Login from './pages/Login';
import ModificarPerfilHijo from './pages/ModificarPerfilHijo';
import PesoTalla from './pages/PesoTalla';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agregar-perfil-hijo" element={<AgregarPerfilHijo />} />
        <Route path="/config-cuenta-padre" element={<ConfigCuentaPadre />} />
        <Route path="/imc" element={<IMC />} />
        <Route path="/login" element={<Login />} />
        <Route path="/modificar-perfil-hijo" element={<ModificarPerfilHijo />} />
        <Route path="/peso-talla" element={<PesoTalla />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

