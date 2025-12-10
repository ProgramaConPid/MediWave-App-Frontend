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
  status?: 'normal' | 'warning' | 'danger';
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
