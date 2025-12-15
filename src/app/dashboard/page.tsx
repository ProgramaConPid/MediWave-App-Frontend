"use client";

import DashboardNav from "@/components/layout/DashboardNav/DashboardNav";
import styles from "./dashboard.module.css";
import CardItemInfo from "@/components/ui/CardItemInfo/CardItemInfo";
import { LuPackage } from "react-icons/lu";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { SlGraph } from "react-icons/sl";
import CardBlockchain from "@/components/ui/CardBlockchain/CardBlockchain";
import TraceCard from "@/components/ui/TraceCard/TraceCard";
import CardCurrentTemp from "@/components/ui/CardCurrentTemp/CardCurrentTemp";
import CardProductDetails from "@/components/ui/CardProductDetails/CardProductDetails";
import { Globe } from "@/components/ui/globe";
import ParticlesBackground from "@/components/ParticlesBackground";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";
import { useState } from "react";
import { getMedicationByBatchOrHash } from "@/services/dashboardServices";
import type { Medication, Batch } from "@/interfaces/blockchain";

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [medication, setMedication] = useState<Medication | null>(null);
  const [batch, setBatch] = useState<Batch | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (value: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getMedicationByBatchOrHash(value);
      setMedication(result.medication);
      setBatch(result.batch);
    } catch {
      setMedication(null);
      setBatch(null);
      setError("Batch o hash no encontrado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.dashboard__section}>
      <DashboardNav />

      {/* Backgrounds */}
      <ParticlesBackground />
      <BlockchainNetwork />
      <FloatingHexagons />

      <div className={styles.gradientOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} style={{ animationDelay: "2s" }} />
        <div className={styles.orb3} style={{ animationDelay: "4s" }} />
      </div>

      {/* ===== TOP STATS ===== */}
      <div className={`container ${styles.dashboard__itemsContainer}`}>
        <CardItemInfo
          icon={<LuPackage className={styles.icon__package} />}
          iconBg="green"
          title="Lotes Activos"
          productInfo={medication?.batches.length ?? 24}
          productDetails="↑ 12% vs. mes anterior"
        />

        <CardItemInfo
          icon={<FaTemperatureArrowUp className={styles.icon__temperature} />}
          iconBg="blue"
          title="Temp. Promedio"
          productInfo={batch ? "-18.5°C" : "--"}
          productDetails={
            batch ? "Dentro del rango óptimo" : "Esperando verificación"
          }
        />

        <CardItemInfo
          icon={<SlGraph className={styles.icon__graph} />}
          iconBg="blue"
          title="Verificaciones"
          productInfo={batch ? 1 : 0}
          productDetails={batch ? "Blockchain confirmado" : "Sin verificar"}
        />
      </div>

      {/* ===== MAIN CARDS ===== */}
      <div className={`container ${styles.dashboard__cardsContainer}`}>
        <div className={styles.dashboard__cardsContainerLeft}>
          <CardCurrentTemp currentTemp={batch ? "-18.5" : "--"} />

          <CardProductDetails
            currentTemp={batch ? "-18.5" : "--"}
            productId={batch?.lot_number ?? "—"}
            productName={medication?.name ?? "Seleccione un lote"}
            productTag={batch ? "Óptimo" : "No verificado"}
          />
        </div>

        <div className={styles.dashboard__cardsContainerAside}>
          <TraceCard
            timeline={
              batch
                ? [
                    {
                      type: "origin",
                      place: medication?.manufacturer ?? "Origen",
                      city: "Puurs",
                      country: "Bélgica",
                      datetime: batch.production_date,
                      temperature: -20.2,
                    },
                    {
                      type: "destination",
                      place: "Destino",
                      city: "Madrid",
                      country: "España",
                      datetime: batch.expiry_date,
                    },
                  ]
                : [
                    {
                      type: "origin",
                      place: "—",
                      city: "—",
                      country: "—",
                      datetime: "",
                    },
                  ]
            }
          />
        </div>
      </div>

      <div className={`container ${styles.dashboard__cardBlockchainContainer}`}>
        <CardBlockchain onVerify={handleVerify} loading={loading} />

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
