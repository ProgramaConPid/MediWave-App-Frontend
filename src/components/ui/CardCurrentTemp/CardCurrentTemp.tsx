import styles from "./CardTemp.module.css";

const CardCurrentTemp = ({ currentTemp }: { currentTemp: string }) => {
  const minTemp = -30;
  const maxTemp = -10;

  const temp = parseFloat(currentTemp);

  let percent = 0;
  if (!isNaN(temp)) {
    percent = ((temp - minTemp) / (maxTemp - minTemp)) * 100;
    percent = Math.max(0, Math.min(100, percent));
  }

  return (
    <div className={styles.card__temp}>
      <div className={styles.card__tempHeader}>
        <span className={styles.card__tempHeaderTitle}>Temperatura Actual</span>
        <h3 className={styles.card__tempHeaderValue}>{currentTemp}°C</h3>
      </div>

      <div className={styles.progress__container}>
        <div
          className={styles.progress__bar}
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <div className={styles.card__tempInfo}>
        <span className={styles.card__tempSpan}>{minTemp}°C</span>
        <span className={styles.card__recommendedTemp}>
          Óptimo: -25°C - -15°C
        </span>
        <span className={styles.card__tempSpan}>{maxTemp}°C</span>
      </div>
    </div>
  );
};

export default CardCurrentTemp;
