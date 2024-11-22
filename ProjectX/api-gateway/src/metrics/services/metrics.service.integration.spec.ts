// src/metrics/services/metrics.service.integration.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MetricsCollectorService } from './metric.service';
import { SystemMetrics } from '../interfaces/metrics.interface';

describe('MetricsCollectorService Integration Tests', () => {
  let service: MetricsCollectorService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventEmitter: EventEmitter2;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsCollectorService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              const config = {
                METRICS_HOST: 'localhost',
                METRICS_PORT: 9090,
                METRICS_POLL_INTERVAL: 3000,
                METRICS_TIMEOUT: 5000,
                METRICS_HISTORY_LIMIT: 1000,
              };
              return config[key];
            },
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MetricsCollectorService>(MetricsCollectorService);
    configService = module.get<ConfigService>(ConfigService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  afterAll(async () => {
    // Limpa os intervalos e recursos
    service.onModuleDestroy();
  });

  describe('Coleta de Métricas Real', () => {
    it('deve coletar métricas do servidor real', async () => {
      // Tenta coletar métricas
      const metrics = await service.getMetrics();

      // Verifica a estrutura das métricas
      expect(metrics).toBeDefined();
      expect(metrics.cpuUsage).toBeDefined();
      expect(metrics.memoryUsage).toBeDefined();
      expect(metrics.timestamp).toBeDefined();

      // Verifica se os valores estão dentro de intervalos realistas
      expect(metrics.cpuUsage).toBeGreaterThanOrEqual(0);
      expect(metrics.cpuUsage).toBeLessThanOrEqual(100);
      expect(metrics.memoryUsage).toBeGreaterThanOrEqual(0);
      expect(metrics.memoryUsage).toBeLessThanOrEqual(100);
      expect(metrics.timestamp).toBeGreaterThan(Date.now() - 1000); // Não mais antigo que 1 segundo
      expect(metrics.timestamp).toBeLessThanOrEqual(Date.now());

      console.log('Métricas coletadas:', metrics);
    });

    it('deve coletar múltiplas métricas em sequência', async () => {
      const metrics1 = await service.getMetrics();
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Espera 1 segundo
      const metrics2 = await service.getMetrics();

      expect(metrics1.timestamp).toBeLessThan(metrics2.timestamp);

      console.log('Métricas sequenciais:', {
        primeira: metrics1,
        segunda: metrics2,
      });
    });
  });

  describe('Histórico de Métricas Real', () => {
    it('deve acumular histórico de métricas ao longo do tempo', async () => {
      // Coleta algumas métricas em intervalos
      for (let i = 0; i < 3; i++) {
        await service.getMetrics();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const history = service.getMetricsHistory();
      expect(history.length).toBeGreaterThan(0);

      console.log('Histórico de métricas:', history);
    });

    it('deve filtrar histórico por intervalo de tempo', async () => {
      // Coleta métricas por 3 segundos
      for (let i = 0; i < 3; i++) {
        await service.getMetrics();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const lastMinuteHistory = service.getMetricsHistory(1); // Último minuto
      expect(lastMinuteHistory.length).toBeGreaterThan(0);

      console.log('Histórico do último minuto:', lastMinuteHistory);
    });
  });

  describe('Comportamento em Tempo Real', () => {
    it('deve detectar mudanças nas métricas ao longo do tempo', async () => {
      const metrics: SystemMetrics[] = [];

      // Coleta métricas por 3 segundos
      for (let i = 0; i < 3; i++) {
        metrics.push(await service.getMetrics());
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Verifica se houve alguma variação nas métricas
      const cpuVariations = metrics.map((m) => m.cpuUsage);
      const memoryVariations = metrics.map((m) => m.memoryUsage);

      console.log('Variações nas métricas:', {
        cpu: cpuVariations,
        memory: memoryVariations,
      });

      // Não esperamos que todas as métricas sejam idênticas
      const hasVariation =
        cpuVariations.some((v, i, arr) => i > 0 && v !== arr[i - 1]) ||
        memoryVariations.some((v, i, arr) => i > 0 && v !== arr[i - 1]);

      expect(hasVariation).toBeTruthy();
    });
  });

  describe('Resiliência', () => {
    it('deve lidar com múltiplas requisições simultâneas', async () => {
      const promises = Array(5)
        .fill(null)
        .map(() => service.getMetrics());
      const results = await Promise.all(promises);

      expect(results).toHaveLength(5);
      results.forEach((metrics) => {
        expect(metrics).toBeDefined();
        expect(metrics.cpuUsage).toBeDefined();
        expect(metrics.memoryUsage).toBeDefined();
      });

      console.log('Resultados de requisições simultâneas:', results);
    });
  });
});
