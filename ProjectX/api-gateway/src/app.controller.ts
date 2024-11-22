// src/app.controller.ts
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

@Controller()
export class AppController {
  constructor(
    @Inject(ApiGatewayService) private apiGatewayService: ApiGatewayService,
    private readonly metricsService: MetricsCollectorService,
  ) { }

  @Get(':serviceName/:path(*)')
  async proxyGet(
    @Param('serviceName') serviceName: string,
    @Param('path') path: string,
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
  ) {
    console.log(`GET request to /${serviceName}/${path}`); // Log the endpoint

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
