import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração global de pipes
  app.useGlobalPipes(new ValidationPipe());

  // Configuração CORS (deve vir antes do listen)
  app.enableCors({
    origin: 'http://localhost:3001', // porta onde o React está rodando
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Pega a porta da configuração
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000; // fallback para 3000 se não encontrar no config

  // Chama o listen apenas uma vez
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
