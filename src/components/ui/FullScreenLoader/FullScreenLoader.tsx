import styles from "./FullScreenLoader.module.css";

// Full screen overlay with loading spinner
const FullScreenLoader = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <span className={styles.text}>Verificando Transacción...</span>
      </div>
    </div>
  );
};

export default FullScreenLoader;
