import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configService = app.get<ConfigService<Config>>(ConfigService);
  const { port } = configService.get<Config['application']>('application');
  await app.listen(port);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  logger.log(`application is running on ${await app.getUrl()}`);
}
bootstrap();
