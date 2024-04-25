import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { WinstonConfigService, configuration } from './config';
import { PostgresConfigService } from './config/postgres';
import { ModulesModule } from './modules';
import { WinstonModule } from 'nest-winston';
import LogsMiddleware from './core/middleware/logs.middleware';
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: configuration,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    WinstonModule.forRootAsync({ useClass: WinstonConfigService }),

    ModulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
