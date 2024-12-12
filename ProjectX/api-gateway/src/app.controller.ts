import {
  Controller,
  Get,
  Post,
  Delete,
  Res,
  Param,
  Body,
  Headers,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiGatewayService } from './app.service';
import { MetricsCollectorService } from './metrics/services/metric.service';
import { GrpcMetricsService } from './grpc/services/grpc-metrics.service';

@Controller()
export class AppController {
  constructor(
    @Inject(ApiGatewayService) private apiGatewayService: ApiGatewayService,
    private readonly metricsService: MetricsCollectorService,
    private readonly grpcMetricsService: GrpcMetricsService, // Adicione o serviço gRPC
  ) { }

  @Get(':serviceName/:path(*)')
  async proxyGet(
    @Param('serviceName') serviceName: string,
    @Param('path') path: string,
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
  ) {
    console.log(`GET request to /${serviceName}/${path}`);

    try {
      if (serviceName === 'metrics') {
        if (path === 'metrics') {
          const metrics = await this.metricsService.getMetrics();
          if (metrics) {
            return res.status(HttpStatus.OK).json(metrics);
          } else {
            return res.status(HttpStatus.NO_CONTENT).send();
          }
        } else if (path === 'history') {
          const history = await this.metricsService.getMetricsHistory(
            headers['x-metrics-minutes']
              ? parseInt(headers['x-metrics-minutes'])
              : undefined,
          );
          return res.status(HttpStatus.OK).json(history);
        } else if (path === 'grpc/metrics') {
          // Nova rota para gRPC
          try {
            const metrics = await this.grpcMetricsService.getMetrics();
            return res.status(HttpStatus.OK).json(metrics);
          } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              message: `Erro ao obter métricas via gRPC: ${error.message}`,
            });
          }
        } else {
          return res
            .status(HttpStatus.METHOD_NOT_ALLOWED)
            .json({ message: 'Invalid metrics endpoint' });
        }
      } else {
        const response = await this.apiGatewayService.forwardRequest(
          'get',
          serviceName,
          path,
          headers,
        );
        res.status(response.status).set(response.headers).json(response.data);
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Post(':serviceName/:path(*)')
  async proxyPost(
    @Param('serviceName') serviceName: string,
    @Param('path') path: string,
    @Body() body: any,
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
  ) {
    try {
      if (serviceName === 'metrics') {
        if (path === 'grpc/metrics') {
          // Nova rota para gRPC
          try {
            const result = await this.grpcMetricsService.saveMetric(body);
            return res.status(HttpStatus.OK).json(result);
          } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              message: `Erro ao salvar métrica via gRPC: ${error.message}`,
            });
          }
        }
        return res
          .status(HttpStatus.METHOD_NOT_ALLOWED)
          .json({ message: 'Method not allowed for metrics service' });
      }

      const response = await this.apiGatewayService.forwardRequest(
        'post',
        serviceName,
        path,
        headers,
        body,
      );
      res.status(response.status).set(response.headers).json(response.data);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Delete(':serviceName/:path(*)')
  async proxyDelete(
    @Param('serviceName') serviceName: string,
    @Param('path') path: string,
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
  ) {
    try {
      if (serviceName === 'metrics') {
        return res
          .status(HttpStatus.METHOD_NOT_ALLOWED)
          .json({ message: 'Method not allowed for metrics service' });
      }

      const response = await this.apiGatewayService.forwardRequest(
        'delete',
        serviceName,
        path,
        headers,
      );
      res.status(response.status).set(response.headers).json(response.data);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
