import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../assets/homebox.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HomeBox = ({ ip, metrics }) => {
  const [currentTime, setCurrentTime] = useState('');
  const latestMetric = metrics[metrics.length - 1];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const spTime = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      setCurrentTime(spTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
    }
    return value;
  };

  const recentMetrics = metrics.slice(-6);

  const chartData = {
    labels: recentMetrics.map((_, index) => `${index * 10}s`),
    datasets: [
      {
        label: 'CPU Core 0',
        data: recentMetrics.map(m => m.uso_de_cpu_porcentagem_core0),
        borderColor: '#00ffff',
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        tension: 0.4,
        borderWidth: 1.5,
        pointRadius: 2,
      },
      {
        label: 'Memória Total',
        data: recentMetrics.map(m => m.uso_de_memoria_porcentagem_total),
        borderColor: '#00ff00',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        tension: 0.4,
        borderWidth: 1.5,
        pointRadius: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: '#ffff',
          font: { size: 8 },
          maxRotation: 0
        }
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(0, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#ffff',
          font: { size: 8 },
          stepSize: 20
        }
      }
    }
  };

  const state = determineState(latestMetric);

  return (
    <div className="home-box">
      <div className="home-info">
        <h4 className={`state-label ${getStateColorClass(state)}`}>{state}</h4>
        <div className="ip-address">IP: {ip}</div>
        <small>{currentTime}</small>
      </div>

      <div className="content-wrapper">
        <div className="metrics-section">
          <div className="metric-item">
            <h4>CPU</h4>
            <div>Core 0: <span className="metric-value">{formatValue(latestMetric.uso_de_cpu_porcentagem_core0)}</span></div>
            <div>Core 1: <span className="metric-value">{formatValue(latestMetric.uso_de_cpu_porcentagem_core1)}</span></div>
            <div className="metric-spacer"></div>
          </div>

          <div className="metric-item">
            <h4>Memória</h4>
            <div>Total: <span className="metric-value">{formatValue(latestMetric.uso_de_memoria_porcentagem_total)}</span></div>
            <div>Cache: <span className="metric-value">{formatValue(latestMetric.uso_de_memoria_porcentagem_cache)}</span></div>
            <div>Total: <span className="metric-value">{formatValue(latestMetric.uso_de_memoria_bytes_total, false)} bytes</span></div>
          </div>

          <div className="metric-item">
            <h4>Armazenamento</h4>
            <div>Disco C: <span className="metric-value">{formatValue(latestMetric.uso_de_armazenamento_porcentagem_discoC)}</span></div>
            <div>Disco D: <span className="metric-value">{formatValue(latestMetric.uso_de_armazenamento_porcentagem_discoD)}</span></div>
            <div>Disco C Total: <span className="metric-value">{formatValue(latestMetric.uso_de_armazenamento_bytes_discoC, false, true)}</span></div>
          </div>
        </div>

        <div className="chart-section">
          <div className="chart-legends">
            <div className="legend-item">
              <span className="legend-dot cpu"></span>CPU Core 0
            </div>
            <div className="legend-item">
              <span className="legend-dot memory"></span>Memória Total
            </div>
          </div>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default HomeBox;