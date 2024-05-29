import React, { createContext, useState, useContext } from 'react';

const RegistroMedicoContext = createContext();

export const useRegistroMedico = () => {
  return useContext(RegistroMedicoContext);
};

export const RegistroMedicoProvider = ({ children }) => {
  const [registros, setRegistros] = useState([]);

  return (
    <RegistroMedicoContext.Provider value={{ registros, setRegistros }}>
      {children}
    </RegistroMedicoContext.Provider>
  );
};
