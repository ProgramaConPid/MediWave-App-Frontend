"use client"

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

const DashboardPage = () => {
  return (
    <div className={`${styles.dashboard__section}`}>
      <DashboardNav />

      <ParticlesBackground />
      <BlockchainNetwork />
      <FloatingHexagons />

      <div className={styles.gradientOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} style={{ animationDelay: "2s" }} />
        <div className={styles.orb3} style={{ animationDelay: "4s" }} />
      </div>

      <div className={`container ${styles.dashboard__itemsContainer}`}>
        <CardItemInfo
          icon={<LuPackage className={styles.icon__package} />}
          iconBg="green"
          title="Lotes Activos"
          productInfo={24}
          productDetails="↑ 12% vs. mes anterior"
        />
        <CardItemInfo
          icon={<FaTemperatureArrowUp className={styles.icon__temperature} />}
          iconBg="blue"
          title="Temp. Promedio"
          productInfo={"-19.2°C"}
          productDetails="Dentro del rango óptimo"
        />
        <CardItemInfo
          icon={<SlGraph className={styles.icon__graph} />}
          iconBg="blue"
          title="Verificaciones"
          productInfo={156}
          productDetails="Blockchain confirmado"
        />
      </div>

      <div className={`container ${styles.dashboard__cardsContainer}`}>
        <div className={styles.dashboard__cardsContainerLeft}>
          <CardCurrentTemp currentTemp="-18.5" />

          <CardProductDetails
            currentTemp="-18.5"
            productId="MED-2024-001"
            productName="Vacuna COVID-19"
            productTag="Óptimo"
          />
        </div>

        <div className={styles.dashboard__cardsContainerAside}>
          <TraceCard
            timeline={[
              {
                type: "origin",
                place: "Laboratorio Pfizer",
                city: "Puurs",
                country: "Bélgica",
                datetime: "2024-01-15T08:00:00Z",
                temperature: -20.2,
              },
              {
                type: "transit",
                place: "Centro de Distribución",
                city: "París",
                country: "Francia",
                datetime: "2024-01-16T16:45:00Z",
                temperature: -18.5,
              },
              {
                type: "destination",
                place: "Hospital Central",
                city: "Madrid",
                country: "España",
                datetime: "2024-01-18T14:00:00Z",
              },
            ]}
          />
        </div>
      </div>

      <div className={`container ${styles.dashboard__cardBlockchainContainer}`}>
        <CardBlockchain
          transactionId="0x8f7a3b2c4e1d6a9b5c8f2e7d4a1b6c9e3f8a2b5c7d4e1a6b9c2f5e8d1a4b7c"
          blockId="18942156"
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
