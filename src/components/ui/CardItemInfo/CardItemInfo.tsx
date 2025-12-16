import styles from "./CardItemInfo.module.css";
import { CardItemInfoProps } from "@/interfaces/main";

// Component for displaying various item statuses
const CardItemInfo = ({
  icon,
  iconBg,
  title,
  productInfo,
  productDetails,
}: CardItemInfoProps) => {
  // Determine background color class for icon
  const iconBgColor = () => {
    if (iconBg === "blue") return styles.icon__blue;
    if (iconBg === "green") return styles.icon__green;
    if (iconBg === "glacier") return styles.icon__glacier;
    return "";
  };

  // Determine text color class based on title
  const detailsColor = () => {
    switch (title) {
      case "Lotes Activos":
        return styles.temp;

      case "Temp. Promedio":
        return styles.muted;

      case "Verificaciones":
        return styles.glacier;

      default:
        return "";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={`${styles.card__headerIcon} ${iconBgColor()}`}>
          {icon}
        </div>
        <h3 className={styles.card__headerTitle}>{title}</h3>
      </div>

      <div className={styles.card__body}>
        <span className={styles.card__infoValue}>{productInfo}</span>

        <span className={`${styles.card__details} ${detailsColor()}`}>
          {productDetails}
        </span>
      </div>
    </div>
  );
};

export default CardItemInfo;
