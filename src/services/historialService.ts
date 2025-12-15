import axiosInstance from '../lib/axios';
import {
  VaccineHeaderProps,
  TemperatureDataPoint,
  TimelineEvent,
  StatsCardProps,
  Medication,
  Batch,
  Location,
  Shipment,
  StateHistory,
  HistorialResponse,
} from '../interfaces/historial';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Obtiene un medicamento por ID
 */
export const getMedicationById = async (id: string): Promise<Medication> => {
  try {
    const response = await axiosInstance.get<Medication>(`${API_URL}/medications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener medicamento:', error);
    throw error;
  }
};

/**
 * Obtiene un lote por ID con información del medicamento
 */
export const getBatchById = async (id: string): Promise<Batch> => {
  try {
    const response = await axiosInstance.get<Batch>(`${API_URL}/batchs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener lote:', error);
    throw error;
  }
};

/**
 * Obtiene un envío por ID con relaciones completas
 */
export const getShipmentById = async (id: string): Promise<Shipment> => {
  try {
    const response = await axiosInstance.get<Shipment>(`${API_URL}/shipments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener envío:', error);
    throw error;
  }
};

/**
 * Obtiene el historial de estados de un envío
 */
export const getStateHistoryByShipment = async (shipmentId: string): Promise<StateHistory[]> => {
  try {
    const response = await axiosInstance.get<StateHistory[]>(`${API_URL}/state-history`);
    // Filtrar por shipmentId ya que el backend retorna todos
    return response.data.filter(state => state.shipmentId === shipmentId);
  } catch (error) {
    console.error('Error al obtener historial de estados:', error);
    throw error;
  }
};

/**
 * Transforma los datos del backend al formato del frontend
 */
const transformBackendDataToHistorial = (
  shipment: Shipment,
  stateHistory: StateHistory[]
): HistorialResponse => {
  const medication = shipment.batch?.medication;
  
  // Transformar header
  const vaccine: VaccineHeaderProps = {
    vaccineName: medication?.name || 'Medicamento sin nombre',
    vaccineId: medication?.id || '',
    lotNumber: shipment.batch?.batchNumber || '',
    origin: shipment.originLocation?.name || 'Origen desconocido',
    destination: shipment.destinationLocation?.name || 'Destino desconocido',
    temperatureRange: medication?.temperatureMin && medication?.temperatureMax
      ? `Rango Óptimo: ${medication.temperatureMin}°C a ${medication.temperatureMax}°C`
      : 'Rango no especificado',
  };

  // Filtrar registros con temperatura
  const tempRecords = stateHistory.filter(s => s.temperature !== null && s.temperature !== undefined);
  
  // Calcular estadísticas
  const temperatures = tempRecords.map(s => s.temperature!);
  const avgTemp = temperatures.length > 0 
    ? (temperatures.reduce((a, b) => a + b, 0) / temperatures.length).toFixed(1)
    : '0';
  const maxTemp = temperatures.length > 0 ? Math.max(...temperatures).toFixed(1) : '0';
  const minTemp = temperatures.length > 0 ? Math.min(...temperatures).toFixed(1) : '0';
  
  // Contar violaciones de temperatura
  const violations = tempRecords.filter(s => {
    if (!medication?.temperatureMin || !medication?.temperatureMax || !s.temperature) return false;
    return s.temperature < medication.temperatureMin || s.temperature > medication.temperatureMax;
  }).length;

  const stats: Omit<StatsCardProps, 'icon'>[] = [
    {
      title: 'Temp. Promedio',
      value: avgTemp,
      unit: '°C',
      status: 'normal',
      subtitle: 'Dentro del rango',
    },
    {
      title: 'Temp. Máxima',
      value: maxTemp,
      unit: '°C',
      status: 'warning',
      subtitle: 'Pico registrado',
    },
    {
      title: 'Temp. Mínima',
      value: minTemp,
      unit: '°C',
      status: 'danger',
      subtitle: 'Mínimo registrado',
    },
    {
      title: 'Violaciones',
      value: violations.toString(),
      unit: '',
      status: 'violations',
      subtitle: violations === 0 ? 'Sin incidencias' : 'Revisar',
    },
  ];

  // Transformar datos de temperatura
  const temperatureData: TemperatureDataPoint[] = tempRecords
    .map(s => ({
      time: new Date(s.timestamp).toLocaleString('es-ES', { 
        day: '2-digit', 
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      temperature: s.temperature!,
    }))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  // Transformar eventos del timeline
  const events: TimelineEvent[] = stateHistory.map((state, index) => ({
    id: index + 1,
    title: state.location?.name || 'Ubicación desconocida',
    date: new Date(state.timestamp).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    description: state.status,
    priority: state.temperature ? `${state.temperature}°C` : 'N/A',
  }));

  return { vaccine, stats, temperatureData, events };
};

/**
 * Obtiene todo el historial completo de un envío
 * @param shipmentId - ID del envío
 * @returns Datos completos del historial formateados
 */
export const getCompleteHistory = async (shipmentId: string): Promise<HistorialResponse> => {
  try {
    // Obtener datos del envío
    const shipment = await getShipmentById(shipmentId);
    
    // Obtener historial de estados
    const stateHistory = await getStateHistoryByShipment(shipmentId);
    
    // Transformar y retornar
    return transformBackendDataToHistorial(shipment, stateHistory);
  } catch (error) {
    console.error('Error al obtener historial completo:', error);
    throw error;
  }
};

/**
 * Obtiene todos los envíos disponibles
 */
export const getAllShipments = async (): Promise<Shipment[]> => {
  try {
    const response = await axiosInstance.get<Shipment[]>(`${API_URL}/shipments`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener envíos:', error);
    throw error;
  }
};
