"use client";

import React from "react";
import {
  FaThermometerHalf,
  FaLungs,
  FaHeartbeat,
  FaStethoscope,
  FaFilePdf,
} from "react-icons/fa";
import VaccineHeader from "../../components/ui/History/VaccineHeader/VaccineHeader";
import StatsCard from "../../components/ui/History/StatsCard/StatsCard";
import TemperatureChart from "../../components/ui/History/TemperatureChart/TemperatureChart";
import EventTimeline from "../../components/ui/History/EventTimeline/EventTimeline";
import {
  generateHistorialPDF,
  generateStructuredPDF,
} from "../../utils/pdfGenerator";
import styles from "./history.module.css";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import Link from "next/link";
import ParticlesBackground from "@/components/ParticlesBackground";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";

// Datos de ejemplo - estos pueden venir de una API o base de datos
const vaccineData = {
  vaccineName: "Vacuna COVID-19",
  vaccineId: "MED-2024-001",
  lotNumber: "BTC-2024-001",
  origin: "Laboratorio Pfizer, Bélgica",
  destination: "Hospital Central, Madrid",
  temperatureRange: "Rango Óptimo: -25°C a -15°C",
};

const statsData = [
  {
    icon: <FaThermometerHalf />,
    title: "Temp. Promedio",
    value: "-19.6",
    unit: "°C",
    status: "normal" as const,
    subtitle: "Dentro del rango",
  },
  {
    icon: <FaHeartbeat />,
    title: "Temp. Máxima",
    value: "-18.2",
    unit: "°C",
    status: "warning" as const,
    subtitle: "Pico registrado",
  },
  {
    icon: <FaLungs />,
    title: "Temp. Mínima",
    value: "-21.0",
    unit: "°C",
    status: "danger" as const,
    subtitle: "Mínimo registrado",
  },
  {
    icon: <FaStethoscope />,
    title: "Violaciones",
    value: "0",
    unit: "",
    status: "normal" as const,
    subtitle: "Sin incidencias",
  },
];

const temperatureData = [
  { time: "07:00 12/02", temperature: -18.5 },
  { time: "08:00 12/02", temperature: -17.2 },
  { time: "11:00 12/02", temperature: -15.8 },
  { time: "14:00 12/02", temperature: -16.5 },
  { time: "16:00 12/02", temperature: -11.2 },
  { time: "18:00 12/02", temperature: -14.8 },
  { time: "22:00 12/02", temperature: -21.5 },
  { time: "02:00 13/02", temperature: -19.8 },
  { time: "06:00 13/02", temperature: -17.5 },
  { time: "10:00 13/02", temperature: -16.2 },
  { time: "14:00 13/02", temperature: -13.5 },
  { time: "18:00 13/02", temperature: -15.8 },
  { time: "22:00 13/02", temperature: -18.2 },
  { time: "02:00 14/02", temperature: -19.5 },
  { time: "06:00 14/02", temperature: -17.8 },
  { time: "10:00 14/02", temperature: -15.2 },
  { time: "14:00 14/02", temperature: -12.8 },
  { time: "18:00 14/02", temperature: -14.5 },
  { time: "22:00 14/02", temperature: -16.8 },
];

const eventsData = [
  {
    id: 1,
    title: "Fabricación Pfizer-Biotech",
    date: "24/01/2023 16:24",
    description:
      "Inicio del almacenaje: Vacunas específicas deben ser congeladas",
    priority: "+98.4%",
  },
  {
    id: 2,
    title: "Transporte Inteligente A1",
    date: "24/01/2023 16:24",
    description:
      "En tránsito hacia el puerto marítimo desde planta de distribución.",
    priority: "+87.4%",
  },
  {
    id: 3,
    title: "Ruta Cargo Internacional",
    date: "24/01/2023 16:24",
    description: "Llegó al Punto de acopio. Transporte eficiente y oportuno.",
    priority: "+98.4%",
  },
  {
    id: 4,
    title: "Centro de Distribución, Italia",
    date: "24/01/2023 16:24",
    description:
      "Se tránsito hacia el puerto marítimo desde planta de distribución.",
    priority: "+98.4%",
  },
  {
    id: 5,
    title: "Hub Logístico Regional",
    date: "24/01/2023 16:24",
    description:
      "Salida desde el HUB hacia los puntos de origen para su refrigeración",
    priority: "+84.3%",
  },
  {
    id: 6,
    title: "Hospital Central, Madrid",
    date: "24/01/2023 16:24",
    description: "Continúa Base principal para transporte por el continente.",
    priority: "+98.3%",
  },
];

export default function HistorialPage() {
  // Función para generar el PDF capturando todo el contenido visual
  const handleGenerateVisualPDF = async () => {
    await generateHistorialPDF("historial-content", "historial-vacuna-covid19");
  };

  // Función para generar el PDF con datos estructurados
  const handleGenerateStructuredPDF = async () => {
    // Preparar stats sin el icono para el PDF
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const statsForPDF = statsData.map(({ icon, ...rest }) => rest);

    await generateStructuredPDF(
      vaccineData,
      statsForPDF,
      temperatureData,
      eventsData,
      "historial-vacuna-covid19"
    );
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={`container ${styles.navbar__container}`}>
          <div className={styles.navbar__logo}>
            <div className={styles.navbar__logoContainer}>
              <FaHandHoldingMedical className={styles.navbar__logoIcon} />
            </div>
            <div className={styles.navbar__logoTexts}>
              <h3 className={styles.navbar__textsTitle}>MediWave</h3>
              <span className={styles.navbar__textsSpan}>
                Historial Detallado
              </span>
            </div>
          </div>

          {/* Botones de exportación */}
          <div className={styles.exportButtons}>
            <button
              onClick={handleGenerateVisualPDF}
              className={styles.exportBtn}
            >
              <FaFilePdf /> Exportar PDF Visual
            </button>
            <button
              onClick={handleGenerateStructuredPDF}
              className={styles.exportBtn}
            >
              <FaFilePdf /> Exportar PDF Estructurado
            </button>

            <Link href={"/"} className={styles.navbar__homeLink}>
              <FiHome className={styles.navbar__homeIcon} />
            </Link>
          </div>
        </div>
      </nav>

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
        {/* Contenedor principal que será capturado para el PDF */}
        <div id="historial-content">
          <VaccineHeader {...vaccineData} />

          <div className={styles.statsGrid}>
            {statsData.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <TemperatureChart data={temperatureData} />

          <EventTimeline events={eventsData} />
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footer__content}>Todos los datos son verificados mediante blockchain y sensores IoT certificados</p>
      </footer>
    </div>
  );
}
