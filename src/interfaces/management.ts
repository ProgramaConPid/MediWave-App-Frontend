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
  batchNumber: string;
  medicineId: string; // or code, depending on API
  quantity: number;
  productionDate: string;
  expiryDate: string;
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
