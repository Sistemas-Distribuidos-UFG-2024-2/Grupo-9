import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { MetricsCollectorService } from 'src/metrics/services/metric.service';
import * as net from 'net';

// Interface para o serviço de descoberta
export interface IServiceDiscovery {
  getServiceIP(serviceName: string): Promise<string>;
}

// Interface para o serviço de requisição HTTP
export interface IHttpRequestService {
  makeRequest(
    method: string,
    url: string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse>;
}

// Interface para respostas unificadas
export interface ServiceResponse {
  status: number;
  data: any;
  headers: any;
}

// Implementação do serviço de descoberta
@Injectable()
export class ServiceDiscovery implements IServiceDiscovery {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) { }

  async getServiceIP(serviceName: string): Promise<string> {
    // Caso especial para o serviço de métricas
    if (serviceName === 'metrics') {
      return this.configService.get<string>('METRICS_HOST', 'localhost');
    }

    const nomeServerUrl = this.configService.get<string>('NOME_SERVER_URL');
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${nomeServerUrl}/service/${serviceName}`),
      );
      return response.data.ip;
    } catch (error) {
      throw new Error(
        `Erro ao obter IP para o serviço ${serviceName}: ${error.message}`,
      );
    }
  }
}

// Implementação do serviço de requisição HTTP
@Injectable()
export class HttpRequestService implements IHttpRequestService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) { }

  async makeRequest(
    method: string,
    url: string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    try {
      let response;
      switch (method.toLowerCase()) {
        case 'get':
          response = await firstValueFrom(this.httpService.get(url, config));
          break;
        case 'post':
          response = await firstValueFrom(
            this.httpService.post(url, config.data, config),
          );
          break;
        case 'delete':
          response = await firstValueFrom(this.httpService.delete(url, config));
          break;
        default:
          throw new Error(`Método HTTP não suportado: ${method}`);
      }
      return response;
    } catch (error) {
      throw new Error(`Erro na requisição HTTP: ${error.message}`);
    }
  }

  // Método especial para fazer requisição TCP para métricas
  async makeMetricsRequest(host: string, port: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const client = new net.Socket();
      let data = '';

      const timeout = setTimeout(() => {
        client.destroy();
        reject(new Error('Timeout ao conectar ao servidor de métricas'));
      }, 5000);

      client.connect(port, host, () => {
        clearTimeout(timeout);
      });

      client.on('data', (chunk) => {
        data += chunk;
      });

      client.on('end', () => {
        client.destroy();
        resolve(data);
      });

      client.on('error', (error) => {
        clearTimeout(timeout);
        client.destroy();
        reject(new Error(`Erro na conexão TCP: ${error.message}`));
      });
    });
  }
}

// Serviço principal do API Gateway
@Injectable()
export class ApiGatewayService {
  constructor(
    private serviceDiscovery: ServiceDiscovery,
    private httpRequestService: HttpRequestService,
    private metricsService: MetricsCollectorService,
  ) { }

  async forwardRequest(
    method: string,
    serviceName: string,
    path: string,
    headers: any,
    body?: any,
  ): Promise<ServiceResponse> {
    try {
      // Caso especial para o serviço de métricas
      if (serviceName === 'metrics') {
        return this.handleMetricsRequest(path, headers);
      }

      // Fluxo normal para outros serviços
      const serviceIP = await this.serviceDiscovery.getServiceIP(serviceName);
      const targetUrl = `http://${serviceIP}/${path}`;

      const config: AxiosRequestConfig = { headers, data: body };

      const response = await this.httpRequestService.makeRequest(
        method,
        targetUrl,
        config,
      );

      return {
        status: response.status,
        data: response.data,
        headers: response.headers,
      };
    } catch (error) {
      throw new Error(`Erro ao encaminhar requisição: ${error.message}`);
    }
  }

  private async handleMetricsRequest(
    path: string,
    headers: any,
  ): Promise<ServiceResponse> {
    try {
      let data;
      if (path === 'history') {
        const minutes = headers['x-metrics-minutes']
          ? parseInt(headers['x-metrics-minutes'])
          : undefined;
        data = await this.metricsService.getMetricsHistory(minutes);
      } else {
        data = await this.metricsService.getMetrics();
      }

      return {
        status: 200,
        data,
        headers: {
          'Content-Type': 'application/json',
          'X-Metrics-Timestamp': new Date().toISOString(),
        },
      };
    } catch (error) {
      throw new Error(`Erro ao processar métricas: ${error.message}`);
    }
  }
}
