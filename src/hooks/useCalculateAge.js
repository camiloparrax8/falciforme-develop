// src/hooks/useCalculateAge.js
import { useMemo } from 'react';

export const useCalculateAge = () => {
  const calculateAge = useMemo(() => {
    return (birthDate) => {
      if (!birthDate) return null;
      const birth = new Date(birthDate);
      const today = new Date();

      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      const dayDiff = today.getDate() - birth.getDate();

      // Ajuste si no ha pasado el cumpleaños este año
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      return age;
    };
  }, []);

  return { calculateAge };
};
