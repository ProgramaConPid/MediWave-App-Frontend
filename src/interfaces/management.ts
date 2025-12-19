export interface MedicinePayload {
  name: string;
  dosage: string;
  manufacturer: string;
  category: string;
  min_temperature: number;
  max_temperature: number;
  description: string;
}

export interface BatchPayload {
  lot_number: string;
  medicationId: number;
  quantity: number;
  production_date: string;
  expiry_date: string;
  plant: string;
  notes: string;
}

export interface ShipmentPayload {
  departure_date: string;
  arrival_date: string;
  min_temperature: number;
  max_temperature: number;
  status: string;
  origin_location_id: number;
  destination_location_id: number;
  operator_id: number;
  batch_ids: number[];
}

export interface UserPayload {
  fullName: string;
  position: string;
  email: string;
  password: string;
}
