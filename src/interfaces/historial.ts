// Interfaces para los componentes del historial de vacunas

export interface VaccineHeaderProps {
  vaccineName: string;
  vaccineId: string;
  lotNumber: string;
  origin: string;
  destination: string;
  temperatureRange: string;
}

export interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  unit?: string;
  status?: 'normal' | 'warning' | 'danger' | 'violations';
  subtitle?: string;
}

export interface TemperatureDataPoint {
  time: string;
  temperature: number;
}

export interface TemperatureChartProps {
  data: TemperatureDataPoint[];
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: TemperatureDataPoint;
  }>;
}

export interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  priority: string;
}

export interface EventTimelineProps {
  events: TimelineEvent[];
}

// Interfaces de la API Backend
export interface Medication {
  id: number | string;
  name: string;
  dosage?: string;
  description?: string;
  manufacturer?: string;
  min_temperature?: number;
  max_temperature?: number;
  temperatureMin?: number;
  temperatureMax?: number;
  batches?: Batch[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Batch {
  id: number | string;
  medication_id?: number | string;
  medicationId?: number | string;
  lot_number?: string;
  batchNumber?: string;
  quantity?: number;
  production_date?: string;
  manufactureDate?: string;
  expiry_date?: string;
  expirationDate?: string;
  blockchain_hash?: string;
  medication?: Medication;
  createdAt?: string;
  updatedAt?: string;
}

export interface Location {
  id: string | number;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface Shipment {
  id: string | number;
  batch_id?: string | number;
  batchId?: string | number;
  origin_location_id?: string | number;
  originLocationId?: string | number;
  destination_location_id?: string | number;
  destinationLocationId?: string | number;
  status: string;
  departure_date?: string;
  departureDate?: string;
  arrival_date?: string;
  arrivalDate?: string;
  batch?: Batch;
  originLocation?: Location;
  origin_location?: Location;
  destinationLocation?: Location;
  destination_location?: Location;
  createdAt?: string;
  updatedAt?: string;
}

export interface StateHistory {
  id: string | number;
  shipment_id?: string | number;
  shipmentId?: string | number;
  temperature?: number;
  humidity?: number;
  location_id?: string | number;
  locationId?: string | number;
  status: string;
  timestamp: string;
  location?: Location;
  shipment?: Shipment;
  createdAt?: string;
  updatedAt?: string;
}

// Interfaces para las respuestas de la API
export interface HistorialResponse {
  vaccine: VaccineHeaderProps;
  stats: Omit<StatsCardProps, 'icon'>[];
  temperatureData: TemperatureDataPoint[];
  events: TimelineEvent[];
}
