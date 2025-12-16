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
import { getCompleteHistory, getMedicationBatchOptions } from "@/services/historialService";
import {
  VaccineHeaderProps,
  StatsCardProps,
  TemperatureDataPoint,
  TimelineEvent,
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
  const [medicationOptions, setMedicationOptions] = useState<
    Array<{ medicationId: number | string; batchId: number | string; label: string }>
  >([]);
  const [selectedMedicationId, setSelectedMedicationId] = useState<string | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);

  const fetchMedicationOptions = async () => {
    try {
      const options = await getMedicationBatchOptions();
      setMedicationOptions(options);

      console.log("Medicamentos cargados:", options);

      // Si hay opciones disponibles, seleccionar la primera
      if (options.length > 0) {
        setSelectedMedicationId(options[0].medicationId.toString());
        setSelectedBatchId(options[0].batchId.toString());
      }
    } catch (err) {
      console.error("Error al cargar medicamentos:", err);
      setError("No se pudieron cargar los medicamentos disponibles");
    }
  };

  const fetchHistorial = async (medicationId: string, batchId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCompleteHistory(medicationId, batchId);
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
    fetchMedicationOptions();
  }, []);

  useEffect(() => {
    if (selectedMedicationId && selectedBatchId) {
      fetchHistorial(selectedMedicationId, selectedBatchId);
    }
  }, [selectedMedicationId, selectedBatchId]);

  // Función para generar el PDF con datos estructurados
  const handleExportPDF = async () => {
    if (!vaccineData) return;

    // Obtener el nombre del medicamento del label seleccionado
    const selectedOption = medicationOptions.find(
      opt => opt.medicationId.toString() === selectedMedicationId && opt.batchId.toString() === selectedBatchId
    );
    const medicationName = selectedOption?.label.split(' - ')[0] || 'Medicamento';

    await generateStructuredPDF(
      vaccineData,
      statsData,
      temperatureData,
      eventsData,
      `historial-${vaccineData.vaccineId}`,
      medicationName
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
        {/* Selector de medicamento */}
        {medicationOptions.length > 0 && (
          <div className={styles.shipmentSelector}>
            <label htmlFor="medication-select">Seleccionar Medicamento:</label>
            <select
              id="medication-select"
              value={`${selectedMedicationId}-${selectedBatchId}` || ''}
              onChange={(e) => {
                const [medicationId, batchId] = e.target.value.split('-');
                setSelectedMedicationId(medicationId);
                setSelectedBatchId(batchId);
              }}
              className={styles.select}
            >
              {medicationOptions.map((option) => (
                <option key={`${option.medicationId}-${option.batchId}`} value={`${option.medicationId}-${option.batchId}`}>
                  {option.label}
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
