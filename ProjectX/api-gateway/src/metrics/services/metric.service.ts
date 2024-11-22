// src/metrics/services/metrics.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as net from 'net';
import {
  SystemMetrics,
  MetricsServiceConfig,
} from 'src/metrics/interfaces/metrics.interface';

@Injectable()
export class MetricsCollectorService implements OnModuleInit {
  private readonly logger = new Logger(MetricsCollectorService.name);
  private metricsHistory: SystemMetrics[] = [];
  private collector: NodeJS.Timeout;
  private readonly config: MetricsServiceConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.config = this.loadConfig();
  }

  private loadConfig(): MetricsServiceConfig {
    return {
      host: this.configService.get<string>('METRICS_HOST', 'localhost'),
      port: this.configService.get<number>('METRICS_PORT', 9090),
      pollInterval: this.configService.get<number>(
        'METRICS_POLL_INTERVAL',
        3000,
      ),
      timeout: this.configService.get<number>('METRICS_TIMEOUT', 5000),
      historyLimit: this.configService.get<number>(
        'METRICS_HISTORY_LIMIT',
        1000,
      ),
    };
  }

  async onModuleInit() {
    await this.startCollector();
  }

  private async startCollector() {
    this.collector = setInterval(async () => {
      try {
        const metrics = await this.collectMetrics();
        this.storeMetrics(metrics);
        this.eventEmitter.emit('metrics.collected', metrics);
      } catch (error) {
        this.logger.error(`Erro ao coletar métricas: ${error.message}`);
      }
    }, this.config.pollInterval);
  }

  private collectMetrics(): Promise<SystemMetrics> {
    return new Promise((resolve, reject) => {
      const client = new net.Socket();
      let data = '';

      client.connect(this.config.port, this.config.host, () => {
        this.logger.debug(
          `Conectado ao servidor de métricas em ${this.config.host}:${this.config.port}`,
        );
      });

      client.on('data', (chunk) => {
        data += chunk;
      });

      client.on('end', () => {
        try {
          const metrics = this.parseMetricsData(data);
          client.destroy();
          resolve(metrics);
        } catch (error) {
          client.destroy();
          reject(error);
        }
      });

      client.on('error', (error) => {
        client.destroy();
        reject(new Error(`Erro na conexão TCP: ${error.message}`));
      });

      setTimeout(() => {
        client.destroy();
        reject(new Error('Timeout na conexão TCP'));
      }, this.config.timeout);
    });
  }

  private parseMetricsData(data: string): SystemMetrics {
    const lines = data.split('\n');
    const metrics: SystemMetrics = {
      cpuUsage: 0,
      memoryUsage: 0,
      timestamp: Date.now(),
    };

    lines.forEach((line) => {
      if (line.includes('uso_de_cpu_porcentagem')) {
        metrics.cpuUsage = parseFloat(line.split(':')[1].trim());
      } else if (line.includes('uso_de_memoria_porcentagem')) {
        metrics.memoryUsage = parseFloat(line.split(':')[1].trim());
      }
    });

    if (metrics.cpuUsage === 0 && metrics.memoryUsage === 0) {
      throw new Error('Dados de métricas inválidos ou não encontrados');
    }

    return metrics;
  }

  private storeMetrics(metrics: SystemMetrics) {
    this.metricsHistory.push(metrics);
    if (this.metricsHistory.length > this.config.historyLimit) {
      this.metricsHistory.shift();
    }
  }

  async getMetrics(): Promise<SystemMetrics> {
    return this.collectMetrics();
  }

  getMetricsHistory(minutes?: number): SystemMetrics[] {
    if (!minutes) return this.metricsHistory;

    const cutoffTime = Date.now() - minutes * 60 * 1000;
    return this.metricsHistory.filter(
      (metric) => metric.timestamp >= cutoffTime,
    );
  }

  onModuleDestroy() {
    if (this.collector) {
      clearInterval(this.collector);
    }
  }
}
