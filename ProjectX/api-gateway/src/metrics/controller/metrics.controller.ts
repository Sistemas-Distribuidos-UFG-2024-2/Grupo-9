// src/metrics/controllers/metrics.controller.ts
import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MetricsCollectorService } from 'src/metrics/services/metric.service';
import { SystemMetrics } from '../interfaces/metrics.interface';

@ApiTags('metrics')
@Controller('metrics')
export class MetricsController {
  private readonly logger = new Logger(MetricsController.name);

  constructor(private readonly metricsService: MetricsCollectorService) { }

  @Get()
  @ApiOperation({ summary: 'Obter métricas atuais do sistema' })
  @ApiResponse({
    status: 200,
    description: 'Retorna as métricas atuais do sistema',
    type: Object,
  })
  async getCurrentMetrics(): Promise<SystemMetrics> {
    try {
      return await this.metricsService.getMetrics();
    } catch (error) {
      this.logger.error(`Erro ao obter métricas: ${error.message}`);
      throw error;
    }
  }

  @Get('history')
  @ApiOperation({ summary: 'Obter histórico de métricas do sistema' })
  @ApiQuery({
    name: 'minutes',
    required: false,
    type: Number,
    description: 'Filtrar métricas pelos últimos X minutos',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna o histórico de métricas do sistema',
    type: [Object],
  })
  async getMetricsHistory(
    @Query('minutes') minutes?: number,
  ): Promise<SystemMetrics[]> {
    try {
      return this.metricsService.getMetricsHistory(minutes);
    } catch (error) {
      this.logger.error(
        `Erro ao obter histórico de métricas: ${error.message}`,
      );
      throw error;
    }
  }
}
