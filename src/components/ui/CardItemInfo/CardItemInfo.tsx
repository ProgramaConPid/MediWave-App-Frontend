import styles from "@/src/components/ui/CardItemInfo/CardItemInfo.module.css";
import { CardItemInfoProps } from "@/src/interfaces/main";

const CardItemInfo = ({
  icon,
  iconBg,
  title,
  productInfo,
  productDetails,
}: CardItemInfoProps) => {
  const iconBgColor = () => {
    if (iconBg === "blue") {
      return styles.icon__blue;
    }

    if (iconBg === "green") {
      return styles.icon__green;
    }

    if (iconBg === "glacier") {
      return styles.icon__glacier;
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

        <span
          className={`${styles.card__details} ${
            productDetails === "↑ 12% vs. mes anterior" ? styles.temp : ""
          } ${
            productDetails === "Dentro del rango óptimo" ? styles.muted : ""
          } ${
            productDetails === "Blockchain confirmado" ? styles.glacier : ""
          }`}
        >
          {productDetails}
        </span>
      </div>
    </div>
  );
};

export default CardItemInfo;
