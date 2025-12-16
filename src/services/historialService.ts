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

const getLocationById = async (locationId: string): Promise<Location | null> => {
  try {
    const response = await axiosInstance.get<Location>(`/locations/${locationId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener ubicación ${locationId}:`, error);
    return null;
  }
};

export const getAllMedications = async (): Promise<Medication[]> => {
  try {
    const response = await axiosInstance.get<Medication[]>(`/medications`);
    return response.data || [];
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    throw error;
  }
};

export const getMedicationById = async (id: string): Promise<Medication> => {
  try {
    const response = await axiosInstance.get<Medication>(`/medications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener medicamento:', error);
    throw error;
  }
};

export const getAllShipments = async (): Promise<Shipment[]> => {
  try {
    const response = await axiosInstance.get<Shipment[]>(`/shipments`);
    return response.data || [];
  } catch (error) {
    console.error('Error al obtener envíos:', error);
    return [];
  }
};

export const getStateHistoryByBatch = async (batchId: string): Promise<StateHistory[]> => {
  try {
    const response = await axiosInstance.get<StateHistory[]>(`/state-history`);
    const batchIdStr = batchId.toString();
    return response.data?.filter(state => {
      const stateBatchId = (state as unknown as { batchId: string }).batchId?.toString();
      return stateBatchId === batchIdStr;
    }) || [];
  } catch (error) {
    console.error('Error al obtener historial de estados:', error);
    return [];
  }
};

const transformMedicationBatchToHistorial = async (
  medication: Medication,
  batch: Batch,
  stateHistory: StateHistory[],
  shipmentAlerts: TimelineEvent[] = []
): Promise<HistorialResponse> => {
  const medicationName = medication.name || 'Medicamento sin nombre';
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
    lotNumber: lotNumber,
    origin: originName,
    destination: destinationName,
    temperatureRange: temperatureRange,
  };
  const tempRecords = stateHistory.filter(s => s.temperature !== null && s.temperature !== undefined);
  const temperatures = tempRecords.map(s => s.temperature!);
  const avgTemp = temperatures.length > 0 
    ? (temperatures.reduce((a, b) => a + b, 0) / temperatures.length).toFixed(1)
    : '--';
  const maxTemp_value = temperatures.length > 0 ? Math.max(...temperatures).toFixed(1) : '--';
  const minTemp_value = temperatures.length > 0 ? Math.min(...temperatures).toFixed(1) : '--';
  const violations = tempRecords.filter(s => {
    if (minTemp === undefined || maxTemp === undefined || !s.temperature) return false;
    return s.temperature < minTemp || s.temperature > maxTemp;
  }).length;

  const stats: Omit<StatsCardProps, 'icon'>[] = [
    {
      title: 'Temp. Promedio',
      value: avgTemp,
      unit: '°C',
      status: tempRecords.length > 0 ? 'normal' : 'warning',
      subtitle: tempRecords.length > 0 ? 'Dentro del rango' : 'Sin datos',
    },
    {
      title: 'Temp. Máxima',
      value: maxTemp_value,
      unit: '°C',
      status: tempRecords.length > 0 ? 'warning' : 'warning',
      subtitle: tempRecords.length > 0 ? 'Pico registrado' : 'Sin datos',
    },
    {
      title: 'Temp. Mínima',
      value: minTemp_value,
      unit: '°C',
      status: tempRecords.length > 0 ? 'danger' : 'warning',
      subtitle: tempRecords.length > 0 ? 'Mínimo registrado' : 'Sin datos',
    },
    {
      title: 'Violaciones',
      value: violations.toString(),
      unit: '',
      status: tempRecords.length > 0 ? 'violations' : 'normal',
      subtitle: tempRecords.length > 0 ? (violations === 0 ? 'Sin incidencias' : 'Revisar') : 'Sin datos',
    },
  ];

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
  const events: TimelineEvent[] = [];
  if (stateHistory.length === 0) {
    events.push({
      id: 1,
      title: 'Sin registros disponibles',
      date: new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      description: 'No hay datos de temperatura registrados para este lote',
      priority: 'INFO',
    });
  }
  for (let index = 0; index < stateHistory.length; index++) {
    const state = stateHistory[index];
    let locationName = (state.location as unknown as { name: string })?.name || 'Ubicación desconocida';
    if (locationName === 'Ubicación desconocida' && (state as unknown as { locationId: string })?.locationId) {
      const location = await getLocationById((state as unknown as { locationId: string }).locationId.toString());
      if (location) {
        locationName = location.name;
      }
    }
    const statusDescription = (state as unknown as { conditions?: string })?.conditions || state.status || 'Sin descripción';
    
    events.push({
      id: index + 1,
      title: locationName,
      date: new Date(state.timestamp).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      description: statusDescription,
      priority: state.temperature ? `${state.temperature.toFixed(3)}°C` : 'N/A',
    });
  }
  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return { vaccine, stats, temperatureData, events };
};

const getShipmentAlerts = async (batchId: string): Promise<TimelineEvent[]> => {
  try {
    const shipments = await getAllShipments();
    const events: TimelineEvent[] = [];
    let eventId = 0;
    interface ShipmentAlert {
      timestamp: string;
      type: string;
      description: string;
    }
    interface ShipmentData {
      batch?: Batch[];
      alerts?: ShipmentAlert[];
    }
    shipments.forEach((shipment) => {
      const shipmentTyped = shipment as unknown as ShipmentData;
      const hasMatchingBatch = shipmentTyped.batch?.some((b: Batch) => 
        b.id?.toString() === batchId.toString()
      );
      if (hasMatchingBatch && shipmentTyped.alerts && Array.isArray(shipmentTyped.alerts)) {
        shipmentTyped.alerts.forEach((alert: ShipmentAlert) => {
          if (alert.timestamp) {
            events.push({
              id: eventId++,
              title: `🚨 ${alert.type || 'Alerta'}`,
              date: new Date(alert.timestamp).toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }),
              description: alert.description || 'Sin descripción',
              priority: 'ALERT',
            });
          }
        });
      }
    });

    return events;
  } catch (error) {
    console.error('Error al obtener alertas de shipments:', error);
    return [];
  }
};

export const getCompleteHistory = async (medicationId: string, batchId?: string): Promise<HistorialResponse> => {
  try {
    const medication = await getMedicationById(medicationId);
    let batch = medication.batches?.[0];
    if (batchId && medication.batches) {
      batch = medication.batches.find(b => b.id?.toString() === batchId.toString());
    }
    if (!batch) {
      throw new Error('No hay batches disponibles para este medicamento');
    }
    const stateHistory = await getStateHistoryByBatch(batch.id?.toString() || '');
    const shipmentAlerts = await getShipmentAlerts(batch.id?.toString() || '');
    return await transformMedicationBatchToHistorial(medication, batch, stateHistory, shipmentAlerts);
  } catch (error) {
    console.error('Error al obtener historial completo:', error);
    throw error;
  }
};

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
          const batchIndicator = medication.batches!.length > 1 
            ? ` (${batchIndex + 1}/${medication.batches!.length})`
            : '';
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
    console.error('Error al obtener opciones de medicamentos:', error);
    throw error;
  }
};
