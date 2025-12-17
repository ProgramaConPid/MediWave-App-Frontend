import React from "react";
import { VaccineHeaderProps } from "../../../../interfaces/historial";
import styles from "./VaccineHeader.module.css";

const VaccineHeader: React.FC<VaccineHeaderProps> = ({
  vaccineName,
  vaccineId,
  lotNumber,
  origin,
  destination,
  temperatureRange,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{vaccineName}</h1>
          <div className={styles.subtitle}>
            <span className={styles.label}>ID:</span>
            <span className={`${styles.value} ${styles.modified}`}>
              {vaccineId}
            </span>
            <span className={styles.label} style={{ marginLeft: "20px" }}>
              Lote:
            </span>
            <span className={styles.value}>{lotNumber}</span>
          </div>
          <div className={styles.subtitle}>
            <span className={styles.label}>Origen:</span>
            <span className={styles.value}>{origin}</span>
            <span className={styles.label} style={{ marginLeft: "20px" }}>
              Destino:
            </span>
            <span className={styles.value}>{destination}</span>
          </div>
        </div>

        <button className={styles.certificateBtn}>{temperatureRange}</button>
      </div>
    </div>
  );
};

export default VaccineHeader;
