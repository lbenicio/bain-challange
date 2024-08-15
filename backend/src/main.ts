import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger: Logger = await app.resolve(Logger);
  const configService: ConfigService = app.get(ConfigService);

  const origin = configService.get<string>('app.frontendURL');

  app.enableCors({
    origin,
    methods: 'GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  const port: number = configService.get<number>('app.port');
  logger.log(`Application is running on port ${port}`);
  logger.log(`Frontend URL is ${origin}`);
  await app.listen(port);
}
bootstrap();
