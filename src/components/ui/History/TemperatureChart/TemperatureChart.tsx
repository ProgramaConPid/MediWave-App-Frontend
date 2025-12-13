'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TemperatureChartProps, CustomTooltipProps } from '../../../../interfaces/historial';
import styles from './TemperatureChart.module.css';

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipTime}>{payload[0].payload.time}</p>
        <p className={styles.tooltipValue}>
          Temperatura: <strong>{payload[0].value}°C</strong>
        </p>
      </div>
    );
  }
  return null;
};

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {

  return (
    <div className={styles.chartContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Evolución de Temperatura</h2>
        <p className={styles.subtitle}>
          Temperatura vital que permite realizar un protocolo específico
        </p>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={450}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00bcd4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00bcd4" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(138, 180, 213, 0.1)" />
            <XAxis
              dataKey="time"
              stroke="#8ab4d5"
              tick={{ fill: '#8ab4d5', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#8ab4d5"
              tick={{ fill: '#8ab4d5', fontSize: 12 }}
              domain={[-25, -5]}
              label={{
                value: 'Temperatura (°C)',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#8ab4d5', fontSize: 14 },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ color: '#8ab4d5', paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#00bcd4"
              strokeWidth={3}
              dot={{ fill: '#00bcd4', r: 5 }}
              activeDot={{ r: 8, fill: '#00acc1' }}
              name="Temperatura (°C)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TemperatureChart;
