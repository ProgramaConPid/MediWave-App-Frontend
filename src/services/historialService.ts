import axiosInstance from '../lib/axios';
import {
  VaccineHeaderProps,
  TemperatureDataPoint,
  TimelineEvent,
  StatsCardProps,
  Location,
  Shipment,
  StateHistory,
  HistorialResponse,
} from '../interfaces/historial';

// Fetch a location by its ID
const getLocationById = async (locationId: string | number): Promise<Location | null> => {
  try {
    const response = await axiosInstance.get<Location>(`/locations/${locationId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching location ${locationId}:`, error);
    return null;
  }
};

// Fetch all shipments
export const getAllShipments = async (): Promise<Shipment[]> => {
  try {
    const response = await axiosInstance.get<Shipment[]>(`/shipments`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching shipments:', error);
    return [];
  }
};

// Fetch a shipment by ID
export const getShipmentById = async (id: string | number): Promise<Shipment> => {
  try {
    const response = await axiosInstance.get<Shipment>(`/shipments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shipment:', error);
    throw error;
  }
};

// Fetch state history for batches in a specific shipment
export const getStateHistoryByShipment = async (shipment: Shipment): Promise<StateHistory[]> => {
  try {
    const response = await axiosInstance.get<StateHistory[]>(`/state-history`);
    
    // Get all batch IDs from the shipment
    const batchIds = shipment.batches?.map(b => b.id.toString()) || [];
    
    if (batchIds.length === 0) {
      return [];
    }
    
    // Filter state history records that match any of the shipment's batches
    return response.data?.filter(state => {
      const stateBatchId = state.batchId?.toString();
      return stateBatchId && batchIds.includes(stateBatchId);
    }) || [];
  } catch (error) {
    console.error('Error fetching state history:', error);
    return [];
  }
};

// Transform shipment and state history into structured historial response
const transformShipmentToHistorial = async (
  shipment: Shipment,
  stateHistory: StateHistory[]
): Promise<HistorialResponse> => {
  // Use location details from shipment (already populated by API)
  const originLocation = shipment.origin_location;
  const destinationLocation = shipment.destination_location;

  // Prepare batch information
  const batchNames = shipment.batches?.map(b => b.lot_number || b.batchNumber || `Lote ${b.id}`).join(', ') || 'Sin lotes';
  const medicationNames = shipment.batches?.map(b => b.medication?.name).filter(Boolean).join(', ') || 'Medicamentos';

  // Prepare vaccine header
  const vaccine: VaccineHeaderProps = {
    vaccineName: medicationNames,
    vaccineId: shipment.id.toString(),
    lotNumber: batchNames,
    origin: originLocation?.name || 'Origen desconocido',
    destination: destinationLocation?.name || 'Destino desconocido',
    temperatureRange: `Rango Óptimo: ${shipment.min_temperature}°C a ${shipment.max_temperature}°C`,
  };

  // Filter valid temperature records
  const tempRecords = stateHistory.filter(s => s.temperature !== null && s.temperature !== undefined);
  const temperatures = tempRecords.map(s => s.temperature!);

  // Calculate average, max, min temperatures
  const avgTemp = temperatures.length > 0 
    ? (temperatures.reduce((a, b) => a + b, 0) / temperatures.length).toFixed(1)
    : '--';
  const maxTemp_value = temperatures.length > 0 ? Math.max(...temperatures).toFixed(1) : '--';
  const minTemp_value = temperatures.length > 0 ? Math.min(...temperatures).toFixed(1) : '--';

  // Count temperature violations
  const violations = tempRecords.filter(s => {
    if (!s.temperature) return false;
    return s.temperature < shipment.min_temperature || s.temperature > shipment.max_temperature;
  }).length;

  // Prepare stats cards
  const stats: Omit<StatsCardProps, 'icon'>[] = [
    { 
      title: 'Temp. Promedio', 
      value: avgTemp, 
      unit: '°C', 
      status: tempRecords.length > 0 ? 'normal' : 'warning', 
      subtitle: tempRecords.length > 0 ? 'Dentro del rango' : 'Sin datos' 
    },
    { 
      title: 'Temp. Máxima', 
      value: maxTemp_value, 
      unit: '°C', 
      status: tempRecords.length > 0 ? 'warning' : 'warning', 
      subtitle: tempRecords.length > 0 ? 'Pico registrado' : 'Sin datos' 
    },
    { 
      title: 'Temp. Mínima', 
      value: minTemp_value, 
      unit: '°C', 
      status: tempRecords.length > 0 ? 'danger' : 'warning', 
      subtitle: tempRecords.length > 0 ? 'Mínimo registrado' : 'Sin datos' 
    },
    { 
      title: 'Violaciones', 
      value: violations.toString(), 
      unit: '', 
      status: violations > 0 ? 'violations' : 'normal', 
      subtitle: violations === 0 ? 'Sin incidencias' : 'Revisar' 
    },
  ];

  // Prepare temperature chart data
  const temperatureData: TemperatureDataPoint[] = tempRecords
    .map(s => ({ 
      time: new Date(s.timestamp).toLocaleString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }), 
      temperature: s.temperature! 
    }))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  // Prepare timeline events
  const events: TimelineEvent[] = [];
  
  if (stateHistory.length === 0) {
    events.push({
      id: 1,
      title: 'Sin registros',
      date: new Date().toLocaleString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      description: 'No hay datos de historial para este envío',
      priority: 'INFO',
    });
  } else {
    for (let index = 0; index < stateHistory.length; index++) {
      const state = stateHistory[index];
      const temperatureValue = state.temperature ? state.temperature.toFixed(1) : 'N/A';
      const statusDescription = state.conditions || state.notes || state.status || 'Sin descripción';

      events.push({
        id: index + 1,
        title: `${temperatureValue}°C`,
        date: new Date(state.timestamp).toLocaleString('es-ES', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        description: statusDescription,
        priority: state.temperature && (state.temperature < shipment.min_temperature || state.temperature > shipment.max_temperature) ? 'ALERT' : 'NORMAL',
      });
    }
  }
  
  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return { vaccine, stats, temperatureData, events };
};

// Get complete historial for a shipment
export const getCompleteHistory = async (shipmentId: string | number): Promise<HistorialResponse> => {
  try {
    const shipment = await getShipmentById(shipmentId);
    const stateHistory = await getStateHistoryByShipment(shipment);
    
    return await transformShipmentToHistorial(shipment, stateHistory);
  } catch (error) {
    console.error('Error fetching complete history:', error);
    throw error;
  }
};

// Generate shipment options for dropdowns (kept for backward compatibility)
export const getShipmentOptions = async (): Promise<
  Array<{ shipmentId: number | string; label: string }>
> => {
  try {
    const shipments = await getAllShipments();
    const options: Array<{ shipmentId: number | string; label: string }> = [];

    shipments.forEach((shipment) => {
      const batchInfo = shipment.batches && shipment.batches.length > 0
        ? shipment.batches.map(b => b.lot_number || `Lote ${b.id}`).join(', ')
        : 'Sin lotes';
      
      const originName = shipment.origin_location?.name || 'Origen';
      const destName = shipment.destination_location?.name || 'Destino';
      
      options.push({
        shipmentId: shipment.id,
        label: `Envío ${shipment.id} - ${batchInfo} (${originName} → ${destName})`,
      });
    });

    return options;
  } catch (error) {
    console.error('Error fetching shipment options:', error);
    throw error;
  }
};
