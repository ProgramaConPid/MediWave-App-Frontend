import DashboardNav from "@/src/components/layout/DashboardNav.tsx/DashboardNav";
import styles from "./dashboard.module.css";

const DashboardPage = () => {
  return (
    <div className={`${styles.dashboard__section}`}>
      <DashboardNav />
    </div>
  )
}

export default DashboardPage