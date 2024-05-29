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
import PublicRoute from './hooks/PublicRoute';
import ProtectedRoutePerfil from './hooks/ProtectedRoutePerfil';
import PublicRoutePerfil from './hooks/PublicRoutePerfil';
import { PerfilProvider } from './contexts/PerfilContext';
import NotFoundPage from './pages/NotFoundPage'; // Importa la página 404

function App() {
  return (
    <PerfilProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/agregar-perfil-hijo" element={<ProtectedRoute><AgregarPerfilHijo /></ProtectedRoute>} />
          <Route path="/config-cuenta-padre" element={<ProtectedRoute><ConfigCuentaPadre /></ProtectedRoute>} />
          <Route path="/imc" element={<ProtectedRoutePerfil><IMC /></ProtectedRoutePerfil>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/modificar-perfil-hijo" element={<ProtectedRoutePerfil><ModificarPerfilHijo /></ProtectedRoutePerfil>} />
          <Route path="/peso-talla" element={<ProtectedRoutePerfil><PesoTalla /></ProtectedRoutePerfil>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="*" element={<NotFoundPage />} /> {/* Ruta 404 */}
        </Routes>
      </Router>
    </PerfilProvider>
  );
}

export default App;
