import axios from "axios";
import type { VerifiedBatch } from "@/interfaces/blockchain";
import type { TraceStep } from "@/interfaces/blockchain";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const verifyBatch = async (value: string): Promise<VerifiedBatch> => {
  const { data: batches } = await axios.get(`${API_URL}/batchs`);

  const batch = batches.find(
    (b: any) =>
      b.lot_number === value || b.blockchain_hash === value
  );

  if (!batch) throw new Error("Batch not found");

  const { data: shipments } = await axios.get(`${API_URL}/shipments`);

  const shipment = shipments.find((s: any) =>
    s.batches?.some((b: any) => b.id === batch.id)
  );

  const { data: history } = await axios.get(`${API_URL}/state-history`);

  const batchHistory = history
    .filter((h: any) => h.batchId === batch.id)
    .sort(
      (a: any, b: any) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  const timeline: TraceStep[] = batchHistory.map((h: any, index: number) => {
    const isFirst = index === 0;
    const isLast = index === batchHistory.length - 1;

    return {
      type: isFirst ? "origin" : isLast ? "destination" : "transit",
      place:
        h.locationId === shipment?.origin_location?.id
          ? shipment.origin_location.name
          : shipment?.destination_location?.name ?? "Ubicación desconocida",
      address:
        h.locationId === shipment?.origin_location?.id
          ? shipment.origin_location.address
          : shipment?.destination_location?.address ?? "",
      country: "",
      datetime: h.timestamp,
      temperature: h.temperature,
    };
  });

  return {
    batch,
    medication: batch.medication,
    shipment,
    locations: shipment
      ? [shipment.origin_location, shipment.destination_location]
      : [],
    timeline,
    alerts: shipment?.alerts ?? [],
  };
};
