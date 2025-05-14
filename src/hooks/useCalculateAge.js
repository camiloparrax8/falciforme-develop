// src/hooks/useCalculateAge.js
import { useMemo } from 'react';

export const useCalculateAge = () => {
  const calculateAge = useMemo(() => {
    return (birthDate) => {
      if (!birthDate) return null;
      const birth = new Date(birthDate);
      const today = new Date();

      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();

      if (days < 0) {
        months--;
        // Ajustar los días sumando los días del mes anterior
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      if (years < 1) {
        // Si es menor a 1 año, mostrar meses (y opcionalmente días)
        return `${months} meses${days > 0 ? ` y ${days} días` : ''}`;
      }

      return `${years} años`;
    };
  }, []);

  return { calculateAge };
};
