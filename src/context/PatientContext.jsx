import { createContext, useContext, useState } from 'react';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [paciente, setPaciente] = useState(null);  // Guarda todo el objeto paciente

  return (
    <PatientContext.Provider value={{ paciente, setPaciente }}>
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
