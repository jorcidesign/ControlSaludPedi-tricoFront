// PerfilContext.js
import React, { createContext, useContext, useState } from 'react';

const PerfilContext = createContext();

export const usePerfil = () => useContext(PerfilContext);

export const PerfilProvider = ({ children }) => {
  const [perfilActivo, setPerfilActivo] = useState(null);

  return (
    <PerfilContext.Provider value={{ perfilActivo, setPerfilActivo }}>
      {children}
    </PerfilContext.Provider>
  );
};
