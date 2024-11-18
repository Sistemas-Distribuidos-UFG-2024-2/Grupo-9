import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import {
  ApiGatewayService,
  IServiceDiscovery,
  IHttpRequestService,
} from './app.service';
import * as dgram from 'dgram';

describe('AppController', () => {
  let appController: AppController;
  let apiGatewayService: ApiGatewayService;

  // Mock para IServiceDiscovery
  const mockServiceDiscovery: IServiceDiscovery = {
    getServiceIP: jest.fn().mockResolvedValue('localhost'),
  };

  // Mock para IHttpRequestService
  const mockHttpRequestService: IHttpRequestService = {
    makeRequest: jest.fn().mockResolvedValue({
      status: 200,
      data: 'OK',
      headers: {},
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: ApiGatewayService,
          useFactory: () =>
            new ApiGatewayService(mockServiceDiscovery, mockHttpRequestService),
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    apiGatewayService = module.get<ApiGatewayService>(ApiGatewayService);
  });

  describe('proxyPost', () => {
    it('should forward POST request to Lua application and return response', (done) => {
      const client = dgram.createSocket('udp4');
      const serviceName = 'testService';
      const path = '';
      const body = { ip: '192.168.1.100' };
      const headers = { 'Content-Type': 'application/json' };

      const mockExpressResponse: any = {
        status: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        json: jest.fn().mockImplementation((data) => {
          console.log('Response from Lua application:', data);
          client.close();
          done();
        }),
      };

      // Sobrescrever o método forwardRequest
      jest
        .spyOn(apiGatewayService, 'forwardRequest')
        .mockImplementation((method, serviceName, path, headers, body) => {
          return new Promise((resolve) => {
            const message = `POST /${serviceName}?ip=${body.ip}`;
            client.send(message, 3000, 'localhost', (err) => {
              if (err) {
                console.error('Failed to send message:', err);
                done(err);
                return;
              }

              client.on('message', (msg) => {
                const response = msg.toString();
                console.log('Received UDP response:', response);
                const [status, ...bodyParts] = response.split(' ');
                resolve({
                  status: parseInt(status),
                  data: bodyParts.join(' '),
                  headers: {},
                });
              });
            });
          });
        });

      appController.proxyPost(
        serviceName,
        path,
        body,
        headers,
        mockExpressResponse,
      );
    });
  });
});
