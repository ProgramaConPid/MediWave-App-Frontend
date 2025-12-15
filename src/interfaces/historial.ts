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
  id: string;
  name: string;
  description?: string;
  manufacturer?: string;
  temperatureMin?: number;
  temperatureMax?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Batch {
  id: string;
  medicationId: string;
  batchNumber: string;
  quantity: number;
  manufactureDate: string;
  expirationDate: string;
  medication?: Medication;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface Shipment {
  id: string;
  batchId: string;
  originLocationId: string;
  destinationLocationId: string;
  status: string;
  departureDate?: string;
  arrivalDate?: string;
  batch?: Batch;
  originLocation?: Location;
  destinationLocation?: Location;
  createdAt: string;
  updatedAt: string;
}

export interface StateHistory {
  id: string;
  shipmentId: string;
  temperature?: number;
  humidity?: number;
  locationId?: string;
  status: string;
  timestamp: string;
  location?: Location;
  shipment?: Shipment;
  createdAt: string;
  updatedAt: string;
}

// Interfaces para las respuestas de la API
export interface HistorialResponse {
  vaccine: VaccineHeaderProps;
  stats: Omit<StatsCardProps, 'icon'>[];
  temperatureData: TemperatureDataPoint[];
  events: TimelineEvent[];
}
