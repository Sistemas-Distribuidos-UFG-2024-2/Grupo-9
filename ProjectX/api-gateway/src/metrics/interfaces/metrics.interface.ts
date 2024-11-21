export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  timestamp: number;
}

export interface MetricsServiceConfig {
  host: string;
  port: number;
  pollInterval: number;
  timeout: number;
  historyLimit: number;
}
