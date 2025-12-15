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
  batches: Batch[];
}
