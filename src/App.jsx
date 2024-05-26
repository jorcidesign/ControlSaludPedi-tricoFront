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
import ProtectedRoute from './hooks/ProtectedRoute';
import PublicRoute from './hooks/PublicRoute';  // Importa el nuevo hook

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/agregar-perfil-hijo" element={<ProtectedRoute><AgregarPerfilHijo /></ProtectedRoute>} />
        <Route path="/config-cuenta-padre" element={<ProtectedRoute><ConfigCuentaPadre /></ProtectedRoute>} />
        <Route path="/imc" element={<ProtectedRoute><IMC /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />  {/* Usa PublicRoute */}
        <Route path="/modificar-perfil-hijo" element={<ProtectedRoute><ModificarPerfilHijo /></ProtectedRoute>} />
        <Route path="/peso-talla" element={<ProtectedRoute><PesoTalla /></ProtectedRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />  {/* Usa PublicRoute */}
      </Routes>
    </Router>
  );
}

export default App;
