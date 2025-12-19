"use client";

// React and Next.js hooks
import { useState, useEffect } from "react";
// CSS Modules for dashboard styling
import styles from "./dashboard.module.css";

// Layout and UI Component imports
import DashboardNav from "@/components/layout/DashboardNav/DashboardNav";
import CardItemInfo from "@/components/ui/CardItemInfo/CardItemInfo";
import CardBlockchain from "@/components/ui/CardBlockchain/CardBlockchain";
import CardCurrentTemp from "@/components/ui/CardCurrentTemp/CardCurrentTemp";
import CardProductDetails from "@/components/ui/CardProductDetails/CardProductDetails";
import TraceCard from "@/components/ui/TraceCard/TraceCard";
import { Globe } from "@/components/ui/globe";

// Background and Visual Effect components
import ParticlesBackground from "@/components/ParticlesBackground";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";

// Icons
import { LuPackage } from "react-icons/lu";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { SlGraph } from "react-icons/sl";

// Services and Types
import { verifyBatch } from "@/services/dashboardServices";
import type { VerifiedBatch, TraceStep } from "@/interfaces/blockchain";
import { FALLBACK_TIMELINE } from "@/const/defualtTimeline";

// Toast notifications and Loaders
import AlertToast from "@/components/ui/AlertToast/AlertToast";
import { toast } from "react-toastify";
import FullScreenLoader from "@/components/ui/FullScreenLoader/FullScreenLoader";

const DashboardPage = () => {
  // State for storing verified batch data
  const [data, setData] = useState<VerifiedBatch | null>(null);
  // State for loading status during API calls
  const [loading, setLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState<string | null>(null);

  // Effect to load persisted data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("dashboardData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // Effect to save data to localStorage whenever it changes
  useEffect(() => {
    if (data) {
      localStorage.setItem("dashboardData", JSON.stringify(data));
    }
  }, [data]);

  // Handle verification logic when user submits a hash or lot number
  const handleVerify = async (value: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await verifyBatch(value);

      if (!result) {
        // Show alert if batch is not found
        toast(
          <AlertToast
            type="alert"
            description={`Batch o hash "${value}" no encontrado`}
          />,
          {
            autoClose: 5000,
            style: {
              background: "transparent",
              boxShadow: "none",
              padding: 0,
            },
          }
        );
        setData(null);
        setError(`Batch o hash "${value}" no encontrado`);
        return;
      }

      // If batch exists, update data and persistence
      setData(result);
      localStorage.setItem("dashboardData", JSON.stringify(result));
    } catch {
      toast(
        <AlertToast
          type="alert"
          description="Ocurrió un error verificando el lote"
        />,
        {
          autoClose: 5000,
          style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
          },
        }
      );
      setData(null);
      setError("Batch o hash no encontrado");
    } finally {
      setLoading(false);
    }
  };

  // Determine formatted block ID for display
  const blockId = data?.shipment?.blockchainHash
    ? `#${data.shipment.blockchainHash.slice(-6).toUpperCase()}`
    : "#-------";

  // Use timeline from data or fallback to default
  const timeline: TraceStep[] =
    data?.timeline && data.timeline.length > 0
      ? data.timeline
      : FALLBACK_TIMELINE;

  // Effect to show toast notifications based on alerts in the data
  useEffect(() => {
    if (data) {
      if (data.alerts && data.alerts.length > 0) {
        data.alerts.forEach((alert) => {
          toast(
            <AlertToast
              type="alert"
              description={alert.description}
              timestamp={new Date(alert.timestamp ?? "").toLocaleString()}
            />,
            {
              autoClose: 6000,
              style: {
                background: "transparent",
                boxShadow: "none",
                padding: 0,
              },
            }
          );
        });
      } else {
        toast(
          <AlertToast
            type="success"
            description="Todos los lotes están dentro del rango óptimo"
          />,
          {
            autoClose: 5000,
            style: {
              background: "transparent",
              boxShadow: "none",
              padding: 0,
            },
          }
        );
      }
    }
  }, [data]);

  return (
    <div className={styles.dashboard__section}>
      {loading && <FullScreenLoader />}

      <DashboardNav />

      <ParticlesBackground />
      <BlockchainNetwork />
      <FloatingHexagons />

      <div className={`container ${styles.dashboard__itemsContainer}`}>
        <CardItemInfo
          icon={<LuPackage className={styles.icon__package} />}
          iconBg="green"
          title="Lotes Activos"
          productInfo={data?.medicationBatches?.length ?? 0}
          productDetails="Lotes activos del medicamento"
        />

        <CardItemInfo
          icon={<FaTemperatureArrowUp className={styles.icon__temperature} />}
          iconBg="blue"
          title="Temp. Promedio"
          productInfo={
            data?.shipment ? `${data.shipment.min_temperature}°C` : "--"
          }
          productDetails={
            data ? "Dentro del rango óptimo" : "Esperando verificación"
          }
        />

        <CardItemInfo
          icon={<SlGraph className={styles.icon__graph} />}
          iconBg="blue"
          title="Verificaciones"
          productInfo={data ? 1 : 0}
          productDetails={data ? "Blockchain confirmado" : "Sin verificar"}
        />
      </div>

      <div className={`container ${styles.dashboard__cardsContainer}`}>
        <div className={styles.dashboard__cardsContainerLeft}>
          <CardCurrentTemp
            currentTemp={data?.shipment?.min_temperature?.toString() ?? "--"}
            optimalRange={
              data?.medication
                ? {
                    min: data.medication.min_temperature,
                    max: data.medication.max_temperature,
                  }
                : undefined
            }
          />

          <CardProductDetails
            currentTemp={data?.shipment?.min_temperature?.toString() ?? "--"}
            productId={data?.batch.lot_number ?? "—"}
            productName={data?.medication.name ?? "Seleccione un lote"}
            productTag={data ? "Óptimo" : "No verificado"}
            optimalRange={
              data?.medication
                ? {
                    min: data.medication.min_temperature,
                    max: data.medication.max_temperature,
                  }
                : undefined
            }
            manufacturer={data?.medication.manufacturer}
            description={data?.medication.description}
          />
        </div>

        <div className={styles.dashboard__cardsContainerAside}>
          <TraceCard timeline={timeline} />
        </div>
      </div>

      <div className={`container ${styles.dashboard__cardBlockchainContainer}`}>
        <CardBlockchain
          onVerify={handleVerify}
          loading={loading}
          blockId={blockId}
        />
        <Globe className={styles.globe} />
      </div>

      <p className={styles.footer__text}>
        Datos actualizados en tiempo real mediante IoT y verificados en
        blockchain
      </p>
    </div>
  );
};

export default DashboardPage;
