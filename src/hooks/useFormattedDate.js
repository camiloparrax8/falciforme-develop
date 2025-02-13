// src/hooks/useFormattedDate.js
import { useMemo } from 'react';

export const useFormattedDate = () => {
  const formatDate = useMemo(() => {
    return (isoString) => {
      if (!isoString) return '';
      const date = new Date(isoString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
  }, []);

  return { formatDate };
};
