import styles from "./CardProductDetails.module.css";
import { LuPackage, LuInfo } from "react-icons/lu";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { CardProductDetailsProps } from "@/interfaces/main";
import { LuShield } from "react-icons/lu";

// Component to display detailed product information
const CardProductDetails = ({
  productId,
  productName,
  productTag,
  currentTemp,
  manufacturer,
  description,
  optimalRange,
}: CardProductDetailsProps & {
  manufacturer?: string;
  description?: string;
}) => {
  const temp = Number(currentTemp);

  const isOutOfRange =
    optimalRange &&
    !isNaN(temp) &&
    (temp < optimalRange.min || temp > optimalRange.max);

  const badgeText = isOutOfRange ? "Fuera de rango" : productTag;

  return (
    <div className={styles.card__product}>
      <div className={styles.card__productHeader}>
        <div className={styles.card__headerId}>
          <div className={styles.card__headerIconContainer}>
            <LuPackage className={styles.card__headerIcon} />
          </div>
          <div className={styles.card__headerIdInfo}>
            <span className={styles.card__headerInfoId}>ID: {productId}</span>
            <h4 className={styles.card__headerInfoName}>{productName}</h4>
          </div>
        </div>

        <span
          className={`${styles.card__headerTag} ${
            isOutOfRange ? styles.badge__alert : styles.badge__ok
          }`}
        >
          {badgeText}
        </span>
      </div>

      <div className={styles.card__bodyTemp}>
        <div className={styles.card__tempCurrentText}>
          <FaTemperatureArrowUp className={styles.card__tempIcon} />
          <span className={styles.card__tempTextSpan}>Temp. Actual</span>
        </div>
        <span className={styles.card__tempCurrentSpan}>{currentTemp}°C</span>
      </div>

      <div className={styles.card__bodyRange}>
        <div className={styles.card__rangeText}>
          <LuShield className={styles.card__rangeIcon} />
          <span className={styles.card__rangeTextSpan}>Rango Óptimo</span>
        </div>
        <span className={styles.card__rangeSpan}>
          {optimalRange ? `${optimalRange.min}°C - ${optimalRange.max}°C` : "—"}
        </span>
      </div>

      {(manufacturer || description) && (
        <div className={styles.card__bodyInfo}>
          <LuInfo className={styles.card__infoIcon} />
          <div className={styles.card__infoText}>
            {manufacturer && (
              <p className={styles.card__manufacturer}>
                Fabricante: {manufacturer}
              </p>
            )}
            {description && (
              <p className={styles.card__description}>
                Descripción: {description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProductDetails;
