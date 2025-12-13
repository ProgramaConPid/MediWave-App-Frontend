"use client"

import styles from "./nav.module.css";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { SlGraph } from "react-icons/sl";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdLocalShipping } from "react-icons/md";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { ShimmerButton } from "../../ui/shimmer-button";
import { useRouter } from "next/navigation";

const DashboardNav = () => {

  const router = useRouter();

  const handleHistoryClick = () => {
    router.push("/history");
  };

  return (
    <nav className={`${styles.dashboard__nav} ${styles.fadeInScale}`}>
      <div className={`container ${styles.dashboard__navContainer} ${styles.dashboard__navContainer}`}>
        <div className={`${styles.nav__logo} ${styles.fadeSlideLeft}`}>
          <div className={styles.nav__logoContainer}>
            <FaHandHoldingMedical className={`${styles.nav__logoIcon} ${styles.iconPulse}`} />
          </div>
          <div className={styles.nav__logoTexts}>
            <h3 className={styles.nav__textsTitle}>MediWave</h3>
            <span className={styles.nav__textsSpan}>
              Trazabilidad Farmaceutica
            </span>
          </div>
        </div>

        <div className={`${styles.nav__links} ${styles.fadeSlideRight}`}>
          <div className={`${styles.nav__linksSystem} ${styles.hoverSpinFast}`}>
            <SlGraph className={styles.nav__systemIcon} />
            <span className={styles.nav__systemStatus}>Sistema Activo</span>
          </div>

          <ShimmerButton className={`${styles.nav__linksHistory} ${styles.hoverZoom}`} onClick={handleHistoryClick}>
            <FaClockRotateLeft className={styles.nav__historyIcon} />
            <span className={styles.nav__historyText}>Historial</span>
          </ShimmerButton>

          <Link href={"/login"} className={`${styles.nav__linksGestion} ${styles.hoverZoom}`}>
            <MdLocalShipping className={styles.nav__gestionIcon} />
            <span className={styles.nav__gestionText}>Gestión</span>
          </Link>
          
          <Link href={"/"} className={`${styles.nav__linksHome} ${styles.hoverSpinFast}`}>
            <FiHome className={styles.nav__homeIcon} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
