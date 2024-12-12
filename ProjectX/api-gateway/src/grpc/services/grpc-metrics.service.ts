import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  credentials,
  loadPackageDefinition,
  GrpcObject,
  ServiceClientConstructor,
} from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

interface Metric {
  id: string;
  ip: string;
  timestamp: string;
  uso_de_cpu_porcentagem_core0: number;
  uso_de_cpu_porcentagem_core1: number;
  uso_de_memoria_porcentagem_total: number;
  uso_de_memoria_porcentagem_cache: number;
  uso_de_memoria_bytes_total: number;
  uso_de_armazenamento_porcentagem_discoC: number;
  uso_de_armazenamento_porcentagem_discoD: number;
  uso_de_armazenamento_bytes_discoC: number;
}

interface MetricList {
  metrics: Metric[];
}

interface MetricsByIp {
  [ip: string]: MetricList;
}

interface GetMetricsResponse {
  metrics_by_ip: MetricsByIp;
}

@Injectable()
export class GrpcMetricsService {
  private grpcClient: any;

  constructor(private configService: ConfigService) {
    try {
      const PROTO_PATH = join(__dirname, '../../../proto/metric.proto');
      console.log('Loading proto file from:', PROTO_PATH);

      const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      });

      const grpcHost = this.configService.get<string>(
        'GRPC_HOST',
        'localhost:5001',
      );
      console.log('Connecting to gRPC server at:', grpcHost);

      const proto = loadPackageDefinition(packageDefinition) as GrpcObject;
      const MetricService =
        proto.MetricService as any as ServiceClientConstructor;

      const rootCert = readFileSync(
        join(__dirname, '../../../src/certificate.pem'),
      );
      const sslCreds = credentials.createSsl(rootCert);

      this.grpcClient = new MetricService(grpcHost, sslCreds);
      console.log('gRPC client initialized successfully');
    } catch (error) {
      console.error('Error initializing gRPC client:', error);
      throw error;
    }
  }

  async saveMetric(
    metricData: Partial<Metric>,
  ): Promise<{ success: boolean; id: string }> {
    return new Promise((resolve, reject) => {
      try {
        console.log('Saving metric via gRPC:', metricData);

        const request = {
          ip: metricData.ip,
          uso_de_cpu_porcentagem_core0: metricData.uso_de_cpu_porcentagem_core0,
          uso_de_cpu_porcentagem_core1: metricData.uso_de_cpu_porcentagem_core1,
          uso_de_memoria_porcentagem_total:
            metricData.uso_de_memoria_porcentagem_total,
          uso_de_memoria_porcentagem_cache:
            metricData.uso_de_memoria_porcentagem_cache,
          uso_de_memoria_bytes_total: metricData.uso_de_memoria_bytes_total,
          uso_de_armazenamento_porcentagem_discoC:
            metricData.uso_de_armazenamento_porcentagem_discoC,
          uso_de_armazenamento_porcentagem_discoD:
            metricData.uso_de_armazenamento_porcentagem_discoD,
          uso_de_armazenamento_bytes_discoC:
            metricData.uso_de_armazenamento_bytes_discoC,
        };

        this.grpcClient.SaveMetric(
          request,
          (error: any, response: { success: boolean; id: string }) => {
            if (error) {
              console.error('Error saving metric:', error);
              reject(error);
              return;
            }

            console.log('Metric saved successfully:', response);
            resolve(response);
          },
        );
      } catch (error) {
        console.error('Error in saveMetric:', error);
        reject(error);
      }
    });
  }

  async getMetrics(): Promise<{ [ip: string]: Metric[] }> {
    return new Promise((resolve, reject) => {
      try {
        console.log('Fetching metrics via gRPC');

        this.grpcClient.GetMetrics(
          {},
          (error: any, response: GetMetricsResponse) => {
            if (error) {
              console.error('Error fetching metrics:', error);
              reject(error);
              return;
            }

            if (!response || !response.metrics_by_ip) {
              console.log('No metrics found, returning empty object');
              resolve({});
              return;
            }

            // Transformar o resultado para um formato mais amigável
            const result: { [ip: string]: Metric[] } = {};

            Object.entries(response.metrics_by_ip).forEach(
              ([ip, metricList]) => {
                result[ip] = metricList.metrics.map((metric) => ({
                  id: metric.id,
                  ip: metric.ip,
                  timestamp: metric.timestamp,
                  uso_de_cpu_porcentagem_core0:
                    metric.uso_de_cpu_porcentagem_core0,
                  uso_de_cpu_porcentagem_core1:
                    metric.uso_de_cpu_porcentagem_core1,
                  uso_de_memoria_porcentagem_total:
                    metric.uso_de_memoria_porcentagem_total,
                  uso_de_memoria_porcentagem_cache:
                    metric.uso_de_memoria_porcentagem_cache,
                  uso_de_memoria_bytes_total: metric.uso_de_memoria_bytes_total,
                  uso_de_armazenamento_porcentagem_discoC:
                    metric.uso_de_armazenamento_porcentagem_discoC,
                  uso_de_armazenamento_porcentagem_discoD:
                    metric.uso_de_armazenamento_porcentagem_discoD,
                  uso_de_armazenamento_bytes_discoC:
                    metric.uso_de_armazenamento_bytes_discoC,
                }));
              },
            );

            console.log(
              `Successfully fetched metrics for ${Object.keys(result).length} IPs`,
            );
            resolve(result);
          },
        );
      } catch (error) {
        console.error('Error in getMetrics:', error);
        reject(error);
      }
    });
  }
}
