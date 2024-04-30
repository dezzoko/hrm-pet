import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Config } from '../configuration.type';
import * as path from 'path';
@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const {
      postgresHost,
      postgresPassword,
      postgresPort,
      postgresUser,
      postgresDb,
    } = this.configService.get<Config['postgres']>('postgres');
    return {
      type: 'postgres',
      port: postgresPort,
      username: postgresUser,
      // logger: new DatabaseLogger(),
      password: postgresPassword,
      host: postgresHost,
      database: postgresDb,
      entities: [
        path.join(
          __dirname,
          '/../../modules/**/infrastructure/**/*.entity{.ts,.js}',
        ),
      ],
      synchronize: true,
    };
  }
}
