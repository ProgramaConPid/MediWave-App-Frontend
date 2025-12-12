import React from 'react';
import { StatsCardProps } from '../../../../interfaces/historial';
import styles from './StatsCard.module.css';

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  value,
  unit,
  status = 'normal',
  subtitle,
}) => {
  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <div className={`${styles.iconContainer} ${styles[`icon_${status}`]}`}>{icon}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.valueContainer}>
          <span className={styles.value}>{value}</span>
          {unit && <span className={styles.unit}>{unit}</span>}
        </div>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatsCard;
