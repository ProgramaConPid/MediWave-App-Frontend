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

// Fetch a location by its ID
const getLocationById = async (locationId: string): Promise<Location | null> => {
  try {
    const response = await axiosInstance.get<Location>(`/locations/${locationId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching location ${locationId}:`, error);
    return null;
  }
};

// Fetch all medications
export const getAllMedications = async (): Promise<Medication[]> => {
  try {
    const response = await axiosInstance.get<Medication[]>(`/medications`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching medications:', error);
    throw error;
  }
};

// Fetch a medication by ID
export const getMedicationById = async (id: string): Promise<Medication> => {
  try {
    const response = await axiosInstance.get<Medication>(`/medications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching medication:', error);
    throw error;
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

// Fetch state history for a specific batch
export const getStateHistoryByBatch = async (batchId: string): Promise<StateHistory[]> => {
  try {
    const response = await axiosInstance.get<StateHistory[]>(`/state-history`);
    const batchIdStr = batchId.toString();
    return response.data?.filter(state => {
      const stateBatchId = (state as unknown as { batchId: string }).batchId?.toString();
      return stateBatchId === batchIdStr;
    }) || [];
  } catch (error) {
    console.error('Error fetching state history:', error);
    return [];
  }
};

// Transform medication, batch, and history into structured historial response
const transformMedicationBatchToHistorial = async (
  medication: Medication,
  batch: Batch,
  stateHistory: StateHistory[],
  shipmentAlerts: TimelineEvent[] = []
): Promise<HistorialResponse> => {
  // Prepare vaccine header
  const medicationName = medication.name || 'Unnamed Medication';
  const medicationId = medication.id?.toString() || '';
  const lotNumber = batch?.lot_number || batch?.batchNumber || '';
  const originName = 'Centro de Producción';
  const destinationName = 'En tránsito';
  const minTemp = medication?.min_temperature ?? medication?.temperatureMin;
  const maxTemp = medication?.max_temperature ?? medication?.temperatureMax;
  
  const temperatureRange = minTemp !== undefined && maxTemp !== undefined
    ? `Rango Óptimo: ${minTemp}°C a ${maxTemp}°C`
    : 'Rango no especificado';

  const vaccine: VaccineHeaderProps = {
    vaccineName: medicationName,
    vaccineId: medicationId,
    lotNumber,
    origin: originName,
    destination: destinationName,
    temperatureRange,
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
    if (minTemp === undefined || maxTemp === undefined || !s.temperature) return false;
    return s.temperature < minTemp || s.temperature > maxTemp;
  }).length;

  // Prepare stats cards
  const stats: Omit<StatsCardProps, 'icon'>[] = [
    { title: 'Temp. Promedio', value: avgTemp, unit: '°C', status: tempRecords.length > 0 ? 'normal' : 'warning', subtitle: tempRecords.length > 0 ? 'Dentro del rango' : 'Sin datos' },
    { title: 'Temp. Máxima', value: maxTemp_value, unit: '°C', status: tempRecords.length > 0 ? 'warning' : 'warning', subtitle: tempRecords.length > 0 ? 'Pico registrado' : 'Sin datos' },
    { title: 'Temp. Mínima', value: minTemp_value, unit: '°C', status: tempRecords.length > 0 ? 'danger' : 'warning', subtitle: tempRecords.length > 0 ? 'Mínimo registrado' : 'Sin datos' },
    { title: 'Violaciones', value: violations.toString(), unit: '', status: tempRecords.length > 0 ? 'violations' : 'normal', subtitle: tempRecords.length > 0 ? (violations === 0 ? 'Sin incidencias' : 'Revisar') : 'Sin datos' },
  ];

  // Prepare temperature chart data
  const temperatureData: TemperatureDataPoint[] = tempRecords
    .map(s => ({ time: new Date(s.timestamp).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }), temperature: s.temperature! }))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  // Prepare timeline events
  const events: TimelineEvent[] = [];
  if (stateHistory.length === 0) {
    events.push({
      id: 1,
      title: 'No records available',
      date: new Date().toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      description: 'No temperature data recorded for this batch',
      priority: 'INFO',
    });
  }
  for (let index = 0; index < stateHistory.length; index++) {
    const state = stateHistory[index];
    let locationName = (state.location as unknown as { name: string })?.name || 'Unknown location';
    if (locationName === 'Unknown location' && (state as unknown as { locationId: string })?.locationId) {
      const location = await getLocationById((state as unknown as { locationId: string }).locationId.toString());
      if (location) locationName = location.name;
    }
    const statusDescription = (state as unknown as { conditions?: string })?.conditions || state.status || 'No description';

    events.push({
      id: index + 1,
      title: locationName,
      date: new Date(state.timestamp).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      description: statusDescription,
      priority: state.temperature ? `${state.temperature.toFixed(3)}°C` : 'N/A',
    });
  }
  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return { vaccine, stats, temperatureData, events };
};

// Fetch shipment alerts for a batch
const getShipmentAlerts = async (batchId: string): Promise<TimelineEvent[]> => {
  try {
    const shipments = await getAllShipments();
    const events: TimelineEvent[] = [];
    let eventId = 0;

    shipments.forEach((shipment) => {
      const shipmentTyped = shipment as unknown as { batch?: Batch[]; alerts?: { timestamp: string; type: string; description: string }[] };
      const hasMatchingBatch = shipmentTyped.batch?.some(b => b.id?.toString() === batchId.toString());
      if (hasMatchingBatch && shipmentTyped.alerts && Array.isArray(shipmentTyped.alerts)) {
        shipmentTyped.alerts.forEach((alert) => {
          if (alert.timestamp) {
            events.push({
              id: eventId++,
              title: `Alert: ${alert.type || 'Alert'}`,
              date: new Date(alert.timestamp).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
              description: alert.description || 'No description',
              priority: 'ALERT',
            });
          }
        });
      }
    });

    return events;
  } catch (error) {
    console.error('Error fetching shipment alerts:', error);
    return [];
  }
};

// Get complete historial for a medication and optional batch
export const getCompleteHistory = async (medicationId: string, batchId?: string): Promise<HistorialResponse> => {
  try {
    const medication = await getMedicationById(medicationId);
    let batch = medication.batches?.[0];
    if (batchId && medication.batches) {
      batch = medication.batches.find(b => b.id?.toString() === batchId.toString());
    }
    if (!batch) throw new Error('No batches available for this medication');

    const stateHistory = await getStateHistoryByBatch(batch.id?.toString() || '');
    const shipmentAlerts = await getShipmentAlerts(batch.id?.toString() || '');
    return await transformMedicationBatchToHistorial(medication, batch, stateHistory, shipmentAlerts);
  } catch (error) {
    console.error('Error fetching complete history:', error);
    throw error;
  }
};

// Generate medication + batch options for dropdowns
export const getMedicationBatchOptions = async (): Promise<
  Array<{ medicationId: number | string; batchId: number | string; label: string }>
> => {
  try {
    const medications = await getAllMedications();
    const options: Array<{ medicationId: number | string; batchId: number | string; label: string }> = [];

    medications.forEach((medication) => {
      if (medication.batches && medication.batches.length > 0) {
        medication.batches.forEach((batch, batchIndex) => {
          const batchNumber = batch.lot_number || batch.batchNumber || `Batch ${batch.id}`;
          const batchIndicator = medication.batches!.length > 1 ? ` (${batchIndex + 1}/${medication.batches!.length})` : '';
          options.push({
            medicationId: medication.id,
            batchId: batch.id,
            label: `${medication.name} - Lote: ${batchNumber}${batchIndicator}`,
          });
        });
      }
    });

    return options;
  } catch (error) {
    console.error('Error fetching medication batch options:', error);
    throw error;
  }
};
