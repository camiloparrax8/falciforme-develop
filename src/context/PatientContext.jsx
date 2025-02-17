import { createContext, useContext, useState } from 'react';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [idPaciente, setIdPaciente] = useState(null);

  return (
    <PatientContext.Provider value={{ idPaciente, setIdPaciente }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient debe ser usado dentro de un PatientProvider');
  }
  return context;
};
