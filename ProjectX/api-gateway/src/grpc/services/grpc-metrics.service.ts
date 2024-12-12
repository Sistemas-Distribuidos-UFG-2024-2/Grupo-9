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
  id?: string;
  ip: string;
  timestamp?: string;
  uso_de_cpu_porcentagem_core0: number;
  uso_de_cpu_porcentagem_core1: number;
  uso_de_memoria_porcentagem_total: number;
  uso_de_memoria_porcentagem_cache: number;
  uso_de_memoria_bytes_total: number;
  uso_de_armazenamento_porcentagem_discoC: number;
  uso_de_armazenamento_porcentagem_discoD: number;
  uso_de_armazenamento_bytes_discoC: number;
}

interface SaveMetricResponse {
  success: boolean;
  id: string;
}

interface GetMetricsResponse {
  metrics: Metric[];
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

  async saveMetric(metricData: Metric): Promise<SaveMetricResponse> {
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
          (error: any, response: SaveMetricResponse) => {
            if (error) {
              console.error('Error saving metric:', error);
              reject(
                new Error(`Failed to save metric via gRPC: ${error.message}`),
              );
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

  async getMetrics(): Promise<Metric[]> {
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

            if (!response || !response.metrics) {
              console.log('No metrics found, returning empty array');
              resolve([]);
              return;
            }

            const metrics = response.metrics.map((metric: Metric) => ({
              id: metric.id,
              ip: metric.ip,
              timestamp: metric.timestamp,
              uso_de_cpu_porcentagem_core0: metric.uso_de_cpu_porcentagem_core0,
              uso_de_cpu_porcentagem_core1: metric.uso_de_cpu_porcentagem_core1,
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

            console.log(`Successfully fetched ${metrics.length} metrics`);
            resolve(metrics);
          },
        );
      } catch (error) {
        console.error('Error in getMetrics:', error);
        reject(error);
      }
    });
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.getMetrics();
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}
