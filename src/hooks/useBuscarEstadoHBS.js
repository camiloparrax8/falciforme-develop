import { useState, useEffect, useMemo } from 'react';
import { BuscarEstadosHBSid } from '../customService/services/estadoHbsService';

export const useBuscarEstadoHBS = (idPaciente, token) => {
  const [estado, setEstado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false); // Para manejar 404

  useEffect(() => {
    if (!idPaciente || !token) return;

    const controller = new AbortController();

    const fetchEstado = async () => {
      setLoading(true);
      setNotFound(false); // Reinicia estado 404
      try {
        const response = await BuscarEstadosHBSid(token, idPaciente);
        if (!controller.signal.aborted) {
          if (response.data && Array.isArray(response.data)) {
            setEstado(response.data);
          } else {
            setEstado([]);
            setNotFound(true); // Marca como 404 si data es null o vacía
          }
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          if (err.response?.status === 404) {
            setEstado([]);
            setNotFound(true); // Manejo explícito de 404
          } else {
            setError(err.message || 'Error al obtener estado HBS');
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchEstado();

    return () => {
      controller.abort();
    };
  }, [idPaciente, token]);

  const estadosTransformados = useMemo(() => {
    return estado.map((item) => ({
      parentesco: item.parentesco,
      linea: item.linea_parentesco,
      estado: item.estado || 'Desconocido',
      estadoColor:
        item.estado === 'Positivo'
          ? 'red'
          : item.estado === 'Negativo'
          ? 'emerald'
          : 'indigo',
    }));
  }, [estado]);

  return { estado: estadosTransformados, loading, error,notFound };
};
