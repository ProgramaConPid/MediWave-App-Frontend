import styles from "./CardTemp.module.css";

const CardCurrentTemp = ({currentTemp}: {currentTemp: string}) => {
  return (
    <div className={styles.card__temp}>
      <div className={styles.card__tempHeader}>
        <span className={styles.card__tempHeaderTitle}>Temperatura Actual</span>
        <h3 className={styles.card__tempHeaderValue}>{currentTemp}°C</h3>
      </div>

      <div className={styles.progress__container}>
        <div className={styles.progress__bar}></div>
      </div>

      <div className={styles.card__tempInfo}>
        <span className={styles.card__tempSpan}>-30°C</span>
        <span className={styles.card__recommendedTemp}>
          Óptimo: -25°C - -15°C
        </span>
        <span className={styles.card__tempSpan}>-10°C</span>
      </div>
    </div>
  );
};

export default CardCurrentTemp;
