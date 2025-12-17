import type { TraceStep } from "@/interfaces/blockchain";

// Default timeline for vaccine traceability
export const FALLBACK_TIMELINE: TraceStep[] = [
  {
    type: "origin",
    place: "Central Warehouse",
    address: "Puurs",
    country: "Bélgica",
    datetime: "2024-01-15T08:00:00Z",
    temperature: -20,
  },
  {
    type: "transit",
    place: "Centro de Distribución",
    address: "París",
    country: "Francia",
    datetime: "2024-01-16T16:45:00Z",
    temperature: -18,
  },
  {
    type: "destination",
    place: "Hospital Central",
    address: "Madrid",
    country: "España",
    datetime: "2024-01-18T14:00:00Z",
    temperature: -19.5,
  },
];
