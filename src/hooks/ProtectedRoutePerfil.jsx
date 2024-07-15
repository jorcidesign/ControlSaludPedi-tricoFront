import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const ProtectedRoutePerfil = ({ children }) => {
  const cookies = new Cookies();
  const perfilActivo = cookies.get('perfilActivo');

  if (!perfilActivo) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutePerfil;
