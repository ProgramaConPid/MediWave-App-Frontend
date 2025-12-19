import axios from "axios";
import type { VerifiedBatch } from "@/interfaces/blockchain";
import type { TraceStep } from "@/interfaces/blockchain";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to verify a batch by lot number or blockchain hash
export const verifyBatch = async (value: string): Promise<VerifiedBatch> => {
  // Fetch all batches from API
  const { data: batches } = await axios.get(`${API_URL}/batchs`);

  // Find the batch that matches the provided value
  const batch = batches.find(
    (b: any) => b.lot_number === value || b.shipment?.blockchainHash === value
  );

  if (!batch) throw new Error("Batch not found");

  // 🔹 NEW: get all batches of the same medication
  const medicationBatches = batches.filter(
    (b: any) => b.medication?.id === batch.medication?.id
  );

  // Fetch all shipments from API
  const { data: shipments } = await axios.get(`${API_URL}/shipments`);

  // Find the shipment containing the batch
  const shipment = shipments.find((s: any) =>
    s.batches?.some((b: any) => b.id === batch.id)
  );

  // Fetch the state history for all batches
  const { data: history } = await axios.get(`${API_URL}/state-history`);

  // Filter and sort the history for the selected batch
  const batchHistory = history
    .filter((h: any) => h.batchId === batch.id)
    .sort(
      (a: any, b: any) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  // Build timeline for the batch
  const timeline: TraceStep[] = batchHistory.map((h: any, index: number) => {
    const isFirst = index === 0;
    const isLast = index === batchHistory.length - 1;

    return {
      type: isFirst ? "origin" : isLast ? "destination" : "transit",
      place:
        h.locationId === shipment?.origin_location?.id
          ? shipment.origin_location.name
          : shipment?.destination_location?.name ?? "Unknown location",
      address:
        h.locationId === shipment?.origin_location?.id
          ? shipment.origin_location.address
          : shipment?.destination_location?.address ?? "",
      country: "",
      datetime: h.timestamp,
      temperature: h.temperature,
    };
  });

  // Return the verified batch info
  return {
    batch,
    medication: batch.medication,
    shipment,
    locations: shipment
      ? [shipment.origin_location, shipment.destination_location]
      : [],
    timeline,
    alerts: shipment?.alerts ?? [],
    medicationBatches,
  };
};
