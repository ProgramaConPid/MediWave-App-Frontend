import { useState, useEffect } from 'react';
import { getVaccineHistory, HistorialResponse } from '../services/historialService';

interface UseHistorialResult {
  data: HistorialResponse | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook personalizado para obtener el historial de una vacuna
 * @param vaccineId - ID de la vacuna
 * @returns Datos del historial, estado de carga y error
 */
export const useHistorial = (vaccineId: string): UseHistorialResult => {
  const [data, setData] = useState<HistorialResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getVaccineHistory(vaccineId);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vaccineId) {
      fetchData();
    }
  }, [vaccineId]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
