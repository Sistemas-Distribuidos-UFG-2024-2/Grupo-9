/* eslint-disable prettier/prettier */
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

@Controller()
export class AppController {
  constructor(
    @Inject(ApiGatewayService) private apiGatewayService: ApiGatewayService,
  ) { }

  @Get(':serviceName/:path(*)')
  async proxyGet(
    @Param('serviceName') serviceName: string,
    @Param('path') path: string,
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
  ) {
    try {
      const response = await this.apiGatewayService.forwardRequest(
        'get',
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

  @Post(':serviceName/:path(*)')
  async proxyPost(
    @Param('serviceName') serviceName: string,
    @Param('path') path: string,
    @Body() body: any,
    @Headers() headers: Record<string, string>,
    @Res() res: Response,
  ) {
    try {
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
