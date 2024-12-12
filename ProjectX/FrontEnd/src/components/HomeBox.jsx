// HomeBox.jsx
import React from 'react';
import '../assets/homebox.css';

const HomeBox = ({ ip, metrics }) => {
  const latestMetric = metrics[metrics.length - 1];

  const determineState = (metric) => {
    const cpuUsage = Math.max(metric.uso_de_cpu_porcentagem_core0, metric.uso_de_cpu_porcentagem_core1);
    const memoryUsage = metric.uso_de_memoria_porcentagem_total;
    const storageUsage = metric.uso_de_armazenamento_porcentagem_discoC;

    if (cpuUsage > 90 || memoryUsage > 90 || storageUsage > 90) return '#Crítico';
    if (cpuUsage > 70 || memoryUsage > 70 || storageUsage > 70) return '#Alerta';
    return '#Normal';
  };

  const getStateColorClass = (state) => {
    switch (state) {
      case '#Normal': return 'green';
      case '#Alerta': return 'yellow';
      case '#Crítico': return 'red';
      default: return '';
    }
  };

  const formatValue = (value, isPercentage = true, isBytes = false) => {
    if (isPercentage) {
      return `${value.toFixed(1)}%`;
    } else if (isBytes) {
      return `${(value / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    } else {
      // Handle other cases if needed
      return value;
    }
  };

  const state = determineState(latestMetric);

  return (
    <div className="home-box">
      <div className="home-info">
        <h4 className={`state-label ${getStateColorClass(state)}`}>{state}</h4>
        <div>IP: {ip}</div>
        <small>{latestMetric.timestamp}</small>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-item">
          <h4>CPU</h4>
          <div>Core 0: <span className="metric-value">{formatValue(latestMetric.uso_de_cpu_porcentagem_core0)}</span></div>
          <div>Core 1: <span className="metric-value">{formatValue(latestMetric.uso_de_cpu_porcentagem_core1)}</span></div>
        </div>

        <div className="metric-item">
          <h4>Memória</h4>
          <div>Total: <span className="metric-value">{formatValue(latestMetric.uso_de_memoria_porcentagem_total)}</span></div>
          <div>Cache: <span className="metric-value">{formatValue(latestMetric.uso_de_memoria_porcentagem_cache)}</span></div>
          <div>Total: <span className="metric-value">{formatValue(latestMetric.uso_de_memoria_bytes_total, false)}</span></div>
        </div>

        <div className="metric-item">
        <h4>Armazenamento</h4>
        <div>Disco C: <span className="metric-value">{formatValue(latestMetric.uso_de_armazenamento_porcentagem_discoC)}</span></div>
        <div>Disco D: <span className="metric-value">{formatValue(latestMetric.uso_de_armazenamento_porcentagem_discoD)}</span></div>
        <div>Disco C Total: <span className="metric-value">{formatValue(latestMetric.uso_de_armazenamento_bytes_discoC, false, true)}</span></div>
      </div>
      </div>
    </div>
  );
};

export default HomeBox;