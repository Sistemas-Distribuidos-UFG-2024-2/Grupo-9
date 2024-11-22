import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import {
  ApiGatewayService,
  IServiceDiscovery,
  IHttpRequestService,
} from './app.service';
import * as dgram from 'dgram';
import { HttpStatus } from '@nestjs/common';
import { SystemMetrics } from './metrics/interfaces/metrics.interface';
import { MetricsCollectorService } from './metrics/services/metric.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('AppController', () => {
  let appController: AppController;
  let apiGatewayService: ApiGatewayService;
  let metricsService: MetricsCollectorService;

  // Mock para ServiceDiscovery
  const mockServiceDiscovery = {
    getServiceIP: jest.fn().mockResolvedValue('localhost'),
    httpService: {}, // Add necessary mock properties
    configService: {}, // Add necessary mock properties
  };

  // Mock para HttpRequestService
  const mockHttpRequestService: IHttpRequestService = {
    makeRequest: jest.fn().mockResolvedValue({
      status: 200,
      data: 'OK',
      headers: {},
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: ApiGatewayService,
          useFactory: () =>
            new ApiGatewayService(
              mockServiceDiscovery,
              mockHttpRequestService,
              metricsService,
            ),
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
        MetricsCollectorService,
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    apiGatewayService = module.get<ApiGatewayService>(ApiGatewayService);
    metricsService = module.get<MetricsCollectorService>(
      MetricsCollectorService,
    );
  });

  describe('proxyPost', () => {
    it('should forward POST request to Lua application and return response', (done) => {
      const client = dgram.createSocket('udp4');
      const serviceName = 'testService';
      const path = '';
      const body = { ip: '192.168.1.100' };
      const headers = { 'Content-Type': 'application/json' };

      const mockExpressResponse: any = {
        status: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        json: jest.fn().mockImplementation((data) => {
          console.log('Response from Lua application:', data);
          client.close();
          done();
        }),
      };

      // Sobrescrever o método forwardRequest
      jest
        .spyOn(apiGatewayService, 'forwardRequest')
        .mockImplementation((method, serviceName, path, headers, body) => {
          return new Promise((resolve) => {
            const message = `POST /${serviceName}?ip=${body.ip}`;
            client.send(message, 3000, 'localhost', (err) => {
              if (err) {
                console.error('Failed to send message:', err);
                done(err);
                return;
              }

              client.on('message', (msg) => {
                const response = msg.toString();
                console.log('Received UDP response:', response);
                const [status, ...bodyParts] = response.split(' ');
                resolve({
                  status: parseInt(status),
                  data: bodyParts.join(' '),
                  headers: {},
                });
              });
            });
          });
        });

      appController.proxyPost(
        serviceName,
        path,
        body,
        headers,
        mockExpressResponse,
      );
    });
  });

  describe('proxyGet', () => {
    it('deve retornar métricas quando o serviceName for "metrics"', async () => {
      const mockMetrics: SystemMetrics = {
        cpuUsage: 50,
        memoryUsage: 70,
        timestamp: Date.now(),
      };

      jest.spyOn(metricsService, 'getMetrics').mockResolvedValue(mockMetrics);
      jest
        .spyOn(metricsService, 'getMetricsHistory')
        .mockResolvedValue([mockMetrics]);

      const mockExpressResponse: any = {
        status: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await appController.proxyGet(
        'metrics',
        'metrics',
        {},
        mockExpressResponse,
      );

      expect(mockExpressResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockExpressResponse.json).toHaveBeenCalledWith(mockMetrics);
      expect(metricsService.getMetrics).toHaveBeenCalled();
      expect(metricsService.getMetricsHistory).not.toHaveBeenCalled();
    });

    it('deve retornar histórico de métricas quando o path for "history"', async () => {
      const mockMetrics: SystemMetrics = {
        cpuUsage: 50,
        memoryUsage: 70,
        timestamp: Date.now(),
      };

      jest
        .spyOn(metricsService, 'getMetricsHistory')
        .mockResolvedValue([mockMetrics]);

      const mockExpressResponse: any = {
        status: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await appController.proxyGet(
        'metrics',
        'history',
        { 'x-metrics-minutes': '5' },
        mockExpressResponse,
      );

      expect(mockExpressResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockExpressResponse.json).toHaveBeenCalledWith([mockMetrics]);
      expect(metricsService.getMetricsHistory).toHaveBeenCalledWith(5);
      expect(metricsService.getMetrics).not.toHaveBeenCalled();
    });
  });

  describe('proxyPost', () => {
    it('deve retornar status 405 quando o serviceName for "metrics"', async () => {
      const mockExpressResponse: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await appController.proxyPost(
        'metrics',
        'any',
        {},
        {},
        mockExpressResponse,
      );

      expect(mockExpressResponse.status).toHaveBeenCalledWith(
        HttpStatus.METHOD_NOT_ALLOWED,
      );
      expect(mockExpressResponse.json).toHaveBeenCalledWith({
        message: 'Método não permitido para o serviço de métricas',
      });
    });
  });
});
