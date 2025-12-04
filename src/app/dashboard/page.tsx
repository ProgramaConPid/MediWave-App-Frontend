import DashboardNav from "@/src/components/layout/DashboardNav/DashboardNav";
import styles from "./dashboard.module.css";
import CardItemInfo from "@/src/components/ui/CardItemInfo/CardItemInfo";
import { LuPackage } from "react-icons/lu";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { SlGraph } from "react-icons/sl";
import CardProductDetails from "@/src/components/ui/CardProductDetails/CardProductDetails";
import CardCurrentTemp from "@/src/components/ui/CardCurrentTemp/CardCurrentTemp";

const DashboardPage = () => {
  return (
    <div className={`${styles.dashboard__section}`}>
      <DashboardNav />

      <div className={styles.dashboard__bg}>
        <span className={`${styles.glow} ${styles.glow1}`}></span>
        <span className={`${styles.glow} ${styles.glow2}`}></span>
        <span className={`${styles.glow} ${styles.glow3}`}></span>
        <span className={`${styles.glow} ${styles.glow4}`}></span>
        <span className={`${styles.glow} ${styles.glow5}`}></span>
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

      </div>
    </div>
  );
};

export default DashboardPage;
