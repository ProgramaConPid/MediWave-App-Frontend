// Interfaces for blockchain data
export interface Location {
  id: number;
  name: string;
  type: string;
  address: string;
}

// Interfaces for traceability data
export interface TraceCardProps {
  timeline: TraceStep[];
}

// Interfaces for traceability data
export interface TraceStep {
  type: "origin" | "transit" | "destination";
  place: string;
  address?: string;
  country: string;
  datetime: string;
  temperature?: number;
}

// Interfaces for batch data
export interface Batch {
  id: number;
  lot_number: string;
  blockchain_hash: string;
  production_date: string;
  expiry_date: string;
}

// Interfaces for medication data
export interface Medication {
  id: number;
  name: string;
  dosage: string;
  manufacturer: string;
  description: string;
}

// Interfaces for shipment data
export interface Shipment {
  id: number;
  departure_date: string;
  arrival_date: string;
  min_temperature: number;
  max_temperature: number;
  blockchainHash: string;
  status: "ALERT" | "IN_TRANSIT" | "DELIVERED";
  origin_location: Location;
  destination_location: Location;
}

// Interfaces for state history data
export interface StateHistory {
  _id: string;
  timestamp: string;
  status: string;
  temperature: number;
  humidity: number;
  conditions: string;
  notes: string;
  operatorId: number;
  locationId: number;
  batchId?: number;
  shipmentId?: number;
  alertIds: number[];
}

// Interfaces for verified batch data
export interface VerifiedBatch {
  batch: Batch;
  medication: Medication;
  shipment?: Shipment;
  locations: Location[];
  timeline: TraceStep[];
  alerts: any[];
}