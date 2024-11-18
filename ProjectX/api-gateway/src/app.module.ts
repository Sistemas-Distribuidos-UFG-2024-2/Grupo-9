/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import {
  ApiGatewayService,
  ServiceDiscovery,
  HttpRequestService,
} from './app.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [AppController],
  providers: [
    ApiGatewayService,
    ServiceDiscovery,
    HttpRequestService,
  ],
})
export class AppModule { }
