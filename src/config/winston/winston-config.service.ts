import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
  utilities,
} from 'nest-winston';
import * as winston from 'winston';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  public createWinstonModuleOptions():
    | Promise<WinstonModuleOptions>
    | WinstonModuleOptions {
    return {
      level: 'http',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(utilities.format.nestLike('hrm-pet')),
          level: 'info',
        }),
        new winston.transports.Console({
          format: winston.format.combine(utilities.format.nestLike('hrm-pet')),
          level: 'error',
        }),
      ],
    };
  }
}
