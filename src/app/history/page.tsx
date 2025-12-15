"use client";

import { useState, useEffect } from "react";
import {
  FaThermometerHalf,
  FaLungs,
  FaHeartbeat,
  FaStethoscope,
  FaFilePdf,
} from "react-icons/fa";
import { SlGraph } from "react-icons/sl";
import { FaClockRotateLeft } from "react-icons/fa6";
import { Package } from "lucide-react";
import VaccineHeader from "../../components/ui/History/VaccineHeader/VaccineHeader";
import StatsCard from "../../components/ui/History/StatsCard/StatsCard";
import TemperatureChart from "../../components/ui/History/TemperatureChart/TemperatureChart";
import EventTimeline from "../../components/ui/History/EventTimeline/EventTimeline";
import { generateStructuredPDF } from "../../utils/pdfGenerator";
import styles from "./history.module.css";
import { FiHome } from "react-icons/fi";
import ParticlesBackground from "@/components/ParticlesBackground";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";
import Navbar from "@/components/layout/Navbar/Navbar";
import NavLink from "@/components/layout/Navbar/NavLink";
import { getCompleteHistory, getAllShipments } from "@/services/historialService";
import {
  VaccineHeaderProps,
  StatsCardProps,
  TemperatureDataPoint,
  TimelineEvent,
  Shipment,
} from "@/interfaces/historial";

// Mapeo de iconos para las stats
const statsIcons = [
  <FaThermometerHalf key="temp-avg" />,
  <FaHeartbeat key="temp-max" />,
  <FaLungs key="temp-min" />,
  <FaStethoscope key="violations" />,
];

export default function HistorialPage() {
  const [vaccineData, setVaccineData] = useState<VaccineHeaderProps | null>(null);
  const [statsData, setStatsData] = useState<Omit<StatsCardProps, "icon">[]>([]);
  const [temperatureData, setTemperatureData] = useState<TemperatureDataPoint[]>([]);
  const [eventsData, setEventsData] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);

  const fetchShipments = async () => {
    try {
      const shipmentsData = await getAllShipments();
      setShipments(shipmentsData);

      console.log("Shipments cargados:", shipmentsData);

      // Si no hay shipment seleccionado y hay envíos disponibles, seleccionar el primero
      if (!selectedShipmentId && shipmentsData.length > 0) {
        setSelectedShipmentId(shipmentsData[0].id);
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

  // Función para generar el PDF con datos estructurados
  const handleExportPDF = async () => {
    if (!vaccineData) return;

    await generateStructuredPDF(
      vaccineData,
      statsData,
      temperatureData,
      eventsData,
      `historial-${vaccineData.vaccineId}`
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
        <NavLink href="/dashboard" icon={<SlGraph />}>
          Dashboard
        </NavLink>
        <NavLink href="/history" icon={<FaClockRotateLeft />} isActive>
          Historial
        </NavLink>
        <NavLink href="/login" icon={<Package />}>
          Gestión
        </NavLink>
        <NavLink href="/" icon={<FiHome />}>
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
        {/* Selector de envío */}
        {shipments.length > 0 && (
          <div className={styles.shipmentSelector}>
            <label htmlFor="shipment-select">Seleccionar Envío:</label>
            <select
              id="shipment-select"
              value={selectedShipmentId || ''}
              onChange={(e) => setSelectedShipmentId(e.target.value)}
              className={styles.select}
            >
              {shipments.map((shipment) => (
                <option key={shipment.id} value={shipment.id}>
                  {shipment.batch?.medication?.name || 'Medicamento'} - {shipment.batch?.batchNumber || shipment.id}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Contenedor principal que será capturado para el PDF */}
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

          {temperatureData.length > 0 && (
            <TemperatureChart data={temperatureData} />
          )}

          {eventsData.length > 0 && <EventTimeline events={eventsData} />}

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
