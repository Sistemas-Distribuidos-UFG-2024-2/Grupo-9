import { Module } from '@nestjs/common';
import { MetricsCollectorService } from './services/metric.service';
import { MetricsController } from './controller/metrics.controller';

@Module({
  controllers: [MetricsController],
  providers: [MetricsCollectorService],
  exports: [MetricsCollectorService],
})
export class MetricsModule { }
