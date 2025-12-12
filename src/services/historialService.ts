import axiosInstance from '../lib/axios';
import {
  VaccineHeaderProps,
  TemperatureDataPoint,
  TimelineEvent,
  StatsCardProps,
} from '../interfaces/historial';

// Interfaces para las respuestas de la API
export interface HistorialResponse {
  vaccine: VaccineHeaderProps;
  stats: Omit<StatsCardProps, 'icon'>[];
  temperatureData: TemperatureDataPoint[];
  events: TimelineEvent[];
}

/**
 * Obtiene todo el historial de una vacuna específica
 * @param vaccineId - ID de la vacuna
 * @returns Datos completos del historial
 */
export const getVaccineHistory = async (
  vaccineId: string
): Promise<HistorialResponse> => {
  try {
    const response = await axiosInstance.get<HistorialResponse>(
      `/vaccines/${vaccineId}/history`
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial de vacuna:', error);
    throw error;
  }
};

/**
 * Obtiene solo los datos de temperatura de una vacuna
 * @param vaccineId - ID de la vacuna
 * @returns Array de datos de temperatura
 */
export const getTemperatureData = async (
  vaccineId: string
): Promise<TemperatureDataPoint[]> => {
  try {
    const response = await axiosInstance.get<TemperatureDataPoint[]>(
      `/vaccines/${vaccineId}/temperature`
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de temperatura:', error);
    throw error;
  }
};

/**
 * Obtiene los eventos de la cadena de frío
 * @param vaccineId - ID de la vacuna
 * @returns Array de eventos
 */
export const getChainEvents = async (
  vaccineId: string
): Promise<TimelineEvent[]> => {
  try {
    const response = await axiosInstance.get<TimelineEvent[]>(
      `/vaccines/${vaccineId}/events`
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    throw error;
  }
};

/**
 * Obtiene información básica de la vacuna
 * @param vaccineId - ID de la vacuna
 * @returns Información de la vacuna
 */
export const getVaccineInfo = async (
  vaccineId: string
): Promise<VaccineHeaderProps> => {
  try {
    const response = await axiosInstance.get<VaccineHeaderProps>(
      `/vaccines/${vaccineId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener información de vacuna:', error);
    throw error;
  }
};

/**
 * Obtiene estadísticas de temperatura
 * @param vaccineId - ID de la vacuna
 * @returns Estadísticas calculadas
 */
export const getTemperatureStats = async (
  vaccineId: string
): Promise<Omit<StatsCardProps, 'icon'>[]> => {
  try {
    const response = await axiosInstance.get<Omit<StatsCardProps, 'icon'>[]>(
      `/vaccines/${vaccineId}/stats`
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
};

/**
 * Exporta el certificado PDF de la vacuna
 * @param vaccineId - ID de la vacuna
 * @returns Blob del PDF
 */
export const downloadVaccineCertificate = async (
  vaccineId: string
): Promise<Blob> => {
  try {
    const response = await axiosInstance.get(
      `/vaccines/${vaccineId}/certificate`,
      {
        responseType: 'blob',
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al descargar certificado:', error);
    throw error;
  }
};
