// src/app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import {
  ApiGatewayService,
  ServiceDiscovery,
  HttpRequestService,
} from './app.service';
import { MetricsController } from './metrics/controller/metrics.controller';
import { MetricsCollectorService } from './metrics/services/metric.service';
import { validationSchema } from 'src/config/validation.schema';
import { GrpcMetricsService } from './grpc/services/grpc-metrics.service';

@Module({
  imports: [
    // Configuração do ConfigModule com validação
    ConfigModule.forRoot({
      isGlobal: true, // Disponível em toda a aplicação
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    // Configuração do HttpModule com timeout global
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    // Event Emitter para métricas
    EventEmitterModule.forRoot({
      // Configuração global do event emitter
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
  ],
  controllers: [AppController, MetricsController],
  providers: [
    // Serviços principais
    {
      provide: ApiGatewayService,
      useClass: ApiGatewayService,
    },
    {
      provide: ServiceDiscovery,
      useClass: ServiceDiscovery,
    },
    {
      provide: HttpRequestService,
      useClass: HttpRequestService,
    },
    // Serviço de métricas
    {
      provide: MetricsCollectorService,
      useClass: MetricsCollectorService,
    },
    // Adicionando o serviço gRPC
    {
      provide: GrpcMetricsService,
      useClass: GrpcMetricsService,
    },
  ],
  exports: [
    // Exporta serviços que podem ser usados em outros módulos
    ApiGatewayService,
    MetricsCollectorService,
    GrpcMetricsService, // Exportando o serviço gRPC
  ],
})
export class AppModule { }
