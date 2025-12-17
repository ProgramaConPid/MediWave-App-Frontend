"use client";

// React Hooks
import { useState, useEffect } from "react";
// Icons
import { Truck, LayoutDashboard } from "lucide-react";
import {
  FaThermometerHalf,
  FaLungs,
  FaHeartbeat,
  FaStethoscope,
  FaFilePdf,
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
// UI Components
import VaccineHeader from "../../components/ui/History/VaccineHeader/VaccineHeader";
import StatsCard from "../../components/ui/History/StatsCard/StatsCard";
import TemperatureChart from "../../components/ui/History/TemperatureChart/TemperatureChart";
import EventTimeline from "../../components/ui/History/EventTimeline/EventTimeline";
import ParticlesBackground from "@/components/ParticlesBackground";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";
import Navbar from "@/components/layout/Navbar/Navbar";
import NavLink from "@/components/layout/Navbar/NavLink";
// Utils and Services
import { generateStructuredPDF } from "../../utils/pdfGenerator";
import styles from "./history.module.css";
import {
  getCompleteHistory,
  getAllShipments,
} from "@/services/historialService";
import {
  VaccineHeaderProps,
  StatsCardProps,
  TemperatureDataPoint,
  TimelineEvent,
  Shipment,
} from "@/interfaces/historial";

// Mapping icons for statistics cards
const statsIcons = [
  <FaThermometerHalf key="temp-avg" />,
  <FaHeartbeat key="temp-max" />,
  <FaLungs key="temp-min" />,
  <FaStethoscope key="violations" />,
];

export default function HistorialPage() {
  // State for different sections of the history report
  const [vaccineData, setVaccineData] = useState<VaccineHeaderProps | null>(null);
  const [statsData, setStatsData] = useState<Omit<StatsCardProps, "icon">[]>([]);
  const [temperatureData, setTemperatureData] = useState<TemperatureDataPoint[]>([]);
  const [eventsData, setEventsData] = useState<TimelineEvent[]>([]);
  // UI State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Filtering Options
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);

  // Fetch available shipments for the dropdown
  const fetchShipments = async () => {
    try {
      const shipmentsData = await getAllShipments();
      setShipments(shipmentsData);

      console.log("Envíos cargados:", shipmentsData);

      // If shipments exist, select the first one by default
      if (shipmentsData.length > 0) {
        setSelectedShipmentId(shipmentsData[0].id.toString());
      }
    } catch (err) {
      console.error("Error al cargar envíos:", err);
      setError("No se pudieron cargar los envíos disponibles");
    }
  };

  const fetchHistorial = async (shipmentId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCompleteHistory(shipmentId);
      setVaccineData(data.vaccine);
      setStatsData(data.stats);
      setTemperatureData(data.temperatureData);
      setEventsData(data.events);
    } catch (err) {
      console.error("Error al cargar historial:", err);
      setError(
        err instanceof Error ? err.message : "Error al cargar el historial"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  useEffect(() => {
    if (selectedShipmentId) {
      fetchHistorial(selectedShipmentId);
    }
  }, [selectedShipmentId]);

  // Function to generate the PDF with structured data
  const handleExportPDF = async () => {
    if (!vaccineData) return;

    // Get the name from the selected shipment
    const selectedShipment = shipments.find(
      (s) => s.id.toString() === selectedShipmentId
    );
    const shipmentName = selectedShipment
      ? `Envío ${selectedShipment.id}`
      : "Envío";

    await generateStructuredPDF(
      vaccineData,
      statsData,
      temperatureData,
      eventsData,
      `historial-${vaccineData.vaccineId}`,
      shipmentName
    );
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ParticlesBackground />
        <BlockchainNetwork />
        <FloatingHexagons />
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Cargando historial...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <ParticlesBackground />
        <BlockchainNetwork />
        <FloatingHexagons />
        <div className={styles.errorMessage}>
          <h2>Error al cargar el historial</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar logoText="MediWave" logoSubtitle="Historial Detallado">
        {vaccineData && (
          <button onClick={handleExportPDF} className={styles.exportBtn}>
            <FaFilePdf /> Exportar PDF
          </button>
        )}
        <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />}>
          Dashboard
        </NavLink>
        <NavLink href="/history" icon={<FaClockRotateLeft size={18} />} isActive>
          Historial
        </NavLink>
        <NavLink href="/login" icon={<Truck size={18} />}>
          Gestión
        </NavLink>
        <NavLink href="/" icon={<FiHome size={18} />}>
          Inicio
        </NavLink>
      </Navbar>

      {/* Animated Background Elements */}
      <ParticlesBackground />
      <BlockchainNetwork />
      <FloatingHexagons />

      {/* Gradient Orbs */}
      <div className={styles.gradientOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} style={{ animationDelay: "2s" }} />
        <div className={styles.orb3} style={{ animationDelay: "4s" }} />
      </div>

      <div className={`container ${styles.container}`}>
        {/* Shipment selector */}
        {shipments.length > 0 && (
          <div className={styles.shipmentSelector}>
            <label htmlFor="shipment-select">Seleccionar Envío:</label>
            <select
              id="shipment-select"
              value={selectedShipmentId || ""}
              onChange={(e) => setSelectedShipmentId(e.target.value)}
              className={styles.select}
            >
              {shipments.map((shipment) => {
                const batchInfo = shipment.batches && shipment.batches.length > 0
                  ? shipment.batches.map(b => b.lot_number || `Lote ${b.id}`).join(', ')
                  : 'Sin lotes';
                const originName = shipment.origin_location?.name || 'Origen';
                const destName = shipment.destination_location?.name || 'Destino';
                
                return (
                  <option key={shipment.id} value={shipment.id.toString()}>
                    Envío {shipment.id} - {batchInfo} ({originName} → {destName})
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {/* Main container that will be captured for the PDF */}
        <div id="historial-content">
          {vaccineData && <VaccineHeader {...vaccineData} />}

          <div className={styles.statsGrid}>
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                {...stat}
                icon={statsIcons[index % statsIcons.length]}
              />
            ))}
          </div>

          <TemperatureChart data={temperatureData} />

          <EventTimeline events={eventsData} />

          {!vaccineData && !loading && (
            <div className={styles.noData}>
              <p>No hay datos de historial disponibles</p>
            </div>
          )}
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footer__content}>
          Todos los datos son verificados mediante blockchain y sensores IoT
          certificados
        </p>
      </footer>
    </div>
  );
}
