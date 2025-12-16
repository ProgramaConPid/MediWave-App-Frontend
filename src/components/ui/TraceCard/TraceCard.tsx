import { TraceCardProps } from "@/interfaces/blockchain";
import { BsCursor } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import styles from "./TraceCard.module.css";

const TraceCard = ({ timeline }: TraceCardProps) => {
  const getIconContainerClass = (type: "origin" | "transit" | "destination") => {
    if (type === "origin") return styles.icon__containerOrigin;
    if (type === "transit") return styles.icon__containerTransit;
    if (type === "destination") return styles.icon__containerDestination;
    return "";
  };

  const getTitleByType = (type: "origin" | "transit" | "destination") => {
    switch (type) {
      case "origin":
        return "Origen";
      case "transit":
        return "En tránsito";
      case "destination":
        return "Destino";
      default:
        return "";
    }
  };

  return (
    <div className={styles.card__trace}>
      <h3 className={styles.card__traceTitle}>Ruta de Trazabilidad</h3>

      <div className={styles.card__traceContainer}>
        {timeline.map((step, index) => (
          <div key={`${step.type}-${index}`} className={styles.card__traceStep}>

            <div
              className={`${styles.card__iconContainer} ${getIconContainerClass(
                step.type
              )}`}
            >
              {step.type === "transit" ? (
                <BsCursor className={styles.card__traceIcon} />
              ) : (
                <SlLocationPin className={styles.card__traceIcon} />
              )}
            </div>

            <div className={styles.card__traceInfo}>
              <span
                className={
                  step.type === "transit"
                    ? styles.card__traceInfoTitleModified
                    : styles.card__traceInfoTitle
                }
              >
                {getTitleByType(step.type)}
              </span>

              <h3 className={styles.card__traceInfoPlace}>
                {step.place}
                {step.country && `, ${step.country}`}
              </h3>

              {step.address && (
                <p className={styles.card__traceInfoAddress}>
                  {step.address}
                </p>
              )}

              <p className={styles.card__traceInfoDatetime}>
                {step.datetime || "—"}
              </p>

              {step.temperature !== undefined && (
                <span className={styles.card__traceInfoTemp}>
                  Temp: {step.temperature}°C
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraceCard;
