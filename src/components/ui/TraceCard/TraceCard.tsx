import { TraceCardProps } from "@/src/interfaces/main";
import { BsCursor } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import styles from "./TraceCard.module.css";

const TraceCard = ({ timeline }: TraceCardProps) => {
  const verifyStep = (type: string) => {
    if (type === "origin") return styles.icon__containerOrigin;
    if (type === "transit") return styles.icon__containerTransit;
    if (type === "destination") return styles.icon__containerDestination;
    return "";
  };

  return (
    <div className={styles.card__trace}>
      <h3 className={styles.card__traceTitle}>Ruta de Trazabilidad</h3>

      <div className={styles.card__traceContainer}>
        {timeline.map((step, index) => (
          <div key={index} className={styles.card__traceStep}>
            <div className={`${styles.card__iconContainer} ${verifyStep(step.type)}`}>
              {step.type === "origin" || step.type === "destination" ? (
                <SlLocationPin className={styles.card__traceIcon} />
              ) : (
                <BsCursor className={styles.card__traceIcon} />
              )}
            </div>
            <div className={styles.card__traceInfo}>
              <span
                className={`${
                  step.type === "transit"
                    ? styles.card__traceInfoTitleModified
                    : styles.card__traceInfoTitle
                }`}
              >
                {step.type === "origin" && "Origin"}
                {step.type === "destination" && "Destination"}
                {step.type === "transit" && "En Tránsito"}
              </span>

              <h3 className={styles.card__traceInfoPlace}>
                {step.place}, {step.country}
              </h3>

              <p className={styles.card__traceInfoDatetime}>{step.datetime}</p>

              {step.temperature && <span className={styles.card__traceInfoTemp}>Temp: {step.temperature}°C</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraceCard;
