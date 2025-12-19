import styles from "./CardTemp.module.css";

interface CardCurrentTempProps {
  currentTemp: string;
  optimalRange?: {
    min: number;
    max: number;
  };
}

const CardCurrentTemp = ({
  currentTemp,
  optimalRange,
}: CardCurrentTempProps) => {
  const temp = parseFloat(currentTemp);

  const minTemp = optimalRange?.min;
  const maxTemp = optimalRange?.max;

  // Calculate percentage for progress bar
  let percent = 0;

  if (
    !isNaN(temp) &&
    typeof minTemp === "number" &&
    typeof maxTemp === "number" &&
    maxTemp !== minTemp
  ) {
    percent = ((temp - minTemp) / (maxTemp - minTemp)) * 100;
    percent = Math.max(0, Math.min(100, percent));
  }

  return (
    <div className={styles.card__temp}>
      <div className={styles.card__tempHeader}>
        <span className={styles.card__tempHeaderTitle}>
          Temperatura Actual
        </span>
        <h3 className={styles.card__tempHeaderValue}>
          {currentTemp}°C
        </h3>
      </div>

      <div className={styles.progress__container}>
        <div
          className={styles.progress__bar}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className={styles.card__tempInfo}>
        <span className={styles.card__tempSpan}>
          {minTemp !== undefined ? `${minTemp}°C` : "--"}
        </span>

        <span className={styles.card__recommendedTemp}>
          {minTemp !== undefined && maxTemp !== undefined
            ? `Óptimo: ${minTemp}°C - ${maxTemp}°C`
            : "Rango óptimo no disponible"}
        </span>

        <span className={styles.card__tempSpan}>
          {maxTemp !== undefined ? `${maxTemp}°C` : "--"}
        </span>
      </div>
    </div>
  );
};

export default CardCurrentTemp;
