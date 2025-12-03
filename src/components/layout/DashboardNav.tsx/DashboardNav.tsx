import styles from "./nav.module.css";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { SlGraph } from "react-icons/sl";
import { FaClockRotateLeft } from "react-icons/fa6";
import Link from "next/link";
import { FiHome } from "react-icons/fi";

const DashboardNav = () => {
  return (
    <nav className={styles.dashboard__nav}>
      <div className={`container ${styles.dashboard__navContainer}`}>
        <div className={styles.nav__logo}>
          <div className={styles.nav__logoContainer}>
            <FaHandHoldingMedical className={styles.nav__logoIcon} />
          </div>
          <div className={styles.nav__logoTexts}>
            <h3 className={styles.nav__textsTitle}>MediWave</h3>
            <span className={styles.nav__textsSpan}>
              Trazabilidad Farmaceutica
            </span>
          </div>
        </div>

        <div className={styles.nav__links}>
          <div className={styles.nav__linksSystem}>
            <SlGraph className={styles.nav__systemIcon} />
            <span className={styles.nav__systemStatus}>Sistema Activo</span>
          </div>

          <Link href={"/history"} className={styles.nav__linksHistory}>
            <FaClockRotateLeft className={styles.nav__historyIcon} />
            <span className={styles.nav__historyText}>Historial</span>
          </Link>

          <Link href={"/"} className={styles.nav__linksHome}>
            <FiHome className={styles.nav__homeIcon} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
