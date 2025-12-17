import styles from "./AlertToast.module.css";
import { FaTemperatureHigh } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

interface AlertToastProps {
  type: "alert" | "success" | "info"; // Type determines styling and icon
  description: string;
  timestamp?: string;
}

// Toast notification component with dynamic styling
const AlertToast = ({ type, description, timestamp }: AlertToastProps) => {
  // Determine CSS class based on alert type
  const alertClass =
    type === "success"
      ? `${styles.alert} ${styles.success}`
      : type === "info"
      ? `${styles.alert} ${styles.info}`
      : styles.alert; // Default to red alert

  // Dynamic icon selection
  const Icon = type === "success" ? FaRegCheckCircle : FaTemperatureHigh;

  return (
    <div className={alertClass}>
      <div className={styles.icon}>
        <Icon />
      </div>

      <div className={styles.content}>
        <h4>
          {type === "alert" ? "Alerta" : type === "success" ? "Éxito" : "Info"}
        </h4>
        <p>{description}</p>

        {timestamp && <span className={styles.temp}>{timestamp}</span>}
      </div>
    </div>
  );
};

export default AlertToast;
