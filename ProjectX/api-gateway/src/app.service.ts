/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

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

// Implementação do serviço de descoberta
@Injectable()
export class ServiceDiscovery implements IServiceDiscovery {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) { }

  async getServiceIP(serviceName: string): Promise<string> {
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
  constructor(private httpService: HttpService) { }

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
}

// Serviço principal do API Gateway
@Injectable()
export class ApiGatewayService {
  constructor(
    private serviceDiscovery: ServiceDiscovery,
    private httpRequestService: HttpRequestService,
  ) { }

  async forwardRequest(
    method: string,
    serviceName: string,
    path: string,
    headers: any,
    body?: any,
  ): Promise<any> {
    try {
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
}
