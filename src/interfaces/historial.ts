// Interfaces for the history component
export interface VaccineHeaderProps {
  vaccineName: string;
  vaccineId: string;
  lotNumber: string;
  origin: string;
  destination: string;
  temperatureRange: string;
}

// Interfaces for the stats card component
export interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  unit?: string;
  status?: 'normal' | 'warning' | 'danger' | 'violations';
  subtitle?: string;
}

// Interfaces for the temperature chart component
export interface TemperatureDataPoint {
  time: string;
  temperature: number;
}

// Interfaces for the temperature chart component
export interface TemperatureChartProps {
  data: TemperatureDataPoint[];
}

// Interfaces for the custom tooltip component
export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: TemperatureDataPoint;
  }>;
}

// Interfaces for the event timeline component
export interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  priority: string;
}

// Interfaces for the event timeline component
export interface EventTimelineProps {
  events: TimelineEvent[];
}

// Interfaces for the API Backend
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

// Interfaces for the batch component
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

// Interfaces for the location component
export interface Location {
  id: string | number;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

// Interfaces for the shipment component (matches API response)
export interface Shipment {
  id: string | number;
  departure_date: string;
  arrival_date: string;
  min_temperature: number;
  max_temperature: number;
  status: string;
  blockchainHash?: string;
  origin_location: Location;
  destination_location: Location;
  operator?: {
    id: number;
    name: string;
    role: string;
    credentials: string;
    email: string;
  };
  batches?: Batch[];
  alerts?: Array<{
    id: number;
    type: string;
    description: string;
    timestamp: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

// Interfaces for the state history component (matches API response)
export interface StateHistory {
  _id: string;
  timestamp: string;
  status: string;
  temperature?: number;
  humidity?: number;
  conditions?: string;
  notes?: string;
  operatorId?: number;
  locationId?: number;
  batchId?: number;
  alertIds?: number[];
  location?: Location;
  __v?: number;
}

// Interfaces for the API response
export interface HistorialResponse {
  vaccine: VaccineHeaderProps;
  stats: Omit<StatsCardProps, 'icon'>[];
  temperatureData: TemperatureDataPoint[];
  events: TimelineEvent[];
}
