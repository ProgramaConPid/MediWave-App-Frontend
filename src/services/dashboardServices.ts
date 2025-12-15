import axios from "axios";
import type { Medication, Batch } from "@/interfaces/blockchain";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface VerifyResponse {
  medication: Medication;
  batch: Batch;
}

export const getMedicationByBatchOrHash = async (
  value: string
): Promise<VerifyResponse> => {
  const res = await axios.get(`${API_URL}/medications`);

  const medications: Medication[] = res.data;

  for (const medication of medications) {
    const batch = medication.batches.find(
      (b) =>
        b.lot_number === value ||
        b.blockchain_hash.toLowerCase() === value.toLowerCase()
    );

    if (batch) {
      return { medication, batch };
    }
  }

  throw new Error("Batch o hash no encontrado");
};
