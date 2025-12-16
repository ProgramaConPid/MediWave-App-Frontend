import styles from "./AlertToast.module.css";
import { FaTemperatureHigh } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

interface AlertToastProps {
  type: "alert" | "success" | "info"; // puedes agregar más tipos si quieres
  description: string;
  timestamp?: string;
}

const AlertToast = ({ type, description, timestamp }: AlertToastProps) => {
  // Determinar clase según el tipo
  const alertClass =
    type === "success"
      ? `${styles.alert} ${styles.success}`
      : type === "info"
      ? `${styles.alert} ${styles.info}`
      : styles.alert; // por defecto alert roja

  // Icono dinámico según tipo
  const Icon = type === "success" ? FaRegCheckCircle : FaTemperatureHigh;

  return (
    <div className={alertClass}>
      <div className={styles.icon}>
        <Icon />
      </div>

      <div className={styles.content}>
        <h4>{type === "alert" ? "Alerta" : type === "success" ? "Éxito" : "Info"}</h4>
        <p>{description}</p>

        {timestamp && <span className={styles.temp}>{timestamp}</span>}
      </div>
    </div>
  );
};

export default AlertToast;
