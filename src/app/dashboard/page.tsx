"use client";

import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";

import DashboardNav from "@/components/layout/DashboardNav/DashboardNav";
import CardItemInfo from "@/components/ui/CardItemInfo/CardItemInfo";
import CardBlockchain from "@/components/ui/CardBlockchain/CardBlockchain";
import CardCurrentTemp from "@/components/ui/CardCurrentTemp/CardCurrentTemp";
import CardProductDetails from "@/components/ui/CardProductDetails/CardProductDetails";
import TraceCard from "@/components/ui/TraceCard/TraceCard";
import { Globe } from "@/components/ui/globe";

import ParticlesBackground from "@/components/ParticlesBackground";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";

import { LuPackage } from "react-icons/lu";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { SlGraph } from "react-icons/sl";

import { verifyBatch } from "@/services/dashboardServices";
import type { VerifiedBatch, TraceStep } from "@/interfaces/blockchain";
import { FALLBACK_TIMELINE } from "@/const/defualtTimeline";

import AlertToast from "@/components/ui/AlertToast/AlertToast";
import { toast } from "react-toastify";
import FullScreenLoader from "@/components/ui/FullScreenLoader/FullScreenLoader";

const DashboardPage = () => {
  const [data, setData] = useState<VerifiedBatch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos guardados en localStorage al montar
  useEffect(() => {
    const savedData = localStorage.getItem("dashboardData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // Guardar datos en localStorage cada vez que cambian
  useEffect(() => {
    if (data) {
      localStorage.setItem("dashboardData", JSON.stringify(data));
    }
  }, [data]);

  const handleVerify = async (value: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await verifyBatch(value);

      if (!result) {
        // Mostrar alerta si el batch no existe
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

      // Si el batch existe, actualizar data y persistencia
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

  const blockId = data?.batch?.blockchain_hash
    ? `#${data.batch.blockchain_hash.slice(-6).toUpperCase()}`
    : "#000000";

  const timeline: TraceStep[] =
    data?.timeline && data.timeline.length > 0
      ? data.timeline
      : FALLBACK_TIMELINE;

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
          productInfo={data ? 1 : 24}
          productDetails="↑ 12% vs. mes anterior"
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
          />

          <CardProductDetails
            currentTemp={data?.shipment?.min_temperature?.toString() ?? "--"}
            productId={data?.batch.lot_number ?? "—"}
            productName={data?.medication.name ?? "Seleccione un lote"}
            productTag={data ? "Óptimo" : "No verificado"}
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
