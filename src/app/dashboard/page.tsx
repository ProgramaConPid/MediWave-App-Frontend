import DashboardNav from "@/src/components/layout/DashboardNav.tsx/DashboardNav";
import styles from "./dashboard.module.css";
import CardItemInfo from "@/src/components/ui/CardItemInfo/CardItemInfo";
import { LuPackage } from "react-icons/lu";
import { FaTemperatureArrowUp, FaHandHoldingMedical } from "react-icons/fa6";

const DashboardPage = () => {
  return (
    <div className={`${styles.dashboard__section}`}>
      <DashboardNav />

      <div className={styles.dashboard__itemsContainer}>
        <CardItemInfo icon={<LuPackage />} iconBg="green" title="Lotes Activos" productInfo={24} productDetails="↑ 12% vs. mes anterior" />
        <CardItemInfo icon={<FaTemperatureArrowUp />} iconBg="blue" title="Temp. Promedio" productInfo={"-19.2°C"} productDetails="Dentro del rango óptimo" />
        <CardItemInfo icon={<FaHandHoldingMedical />} iconBg="blue" title="Verificaciones" productInfo={156} productDetails="Blockchain confirmado"  />
      </div>
    </div>
  )
}

export default DashboardPage