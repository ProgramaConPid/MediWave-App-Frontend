export interface Location {
  id: number;
  name: string;
  type: string;
  address: string;
}

export interface TraceCardProps {
  timeline: TraceStep[];
}

export interface TraceStep {
  type: "origin" | "transit" | "destination";
  place: string;
  address?: string;
  country: string;
  datetime: string;
  temperature?: number;
}

export interface Batch {
  id: number;
  lot_number: string;
  blockchain_hash: string;
  production_date: string;
  expiry_date: string;
}

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  manufacturer: string;
  description: string;
}

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

export interface VerifiedBatch {
  batch: Batch;
  medication: Medication;
  shipment?: Shipment;
  locations: Location[];
  timeline: TraceStep[];
  alerts: any[];
}