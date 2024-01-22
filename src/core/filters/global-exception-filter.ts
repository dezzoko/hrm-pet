import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('test');
  private nodeEnv: string;
  constructor(private configService: ConfigService) {
    const { nodeEnv } =
      this.configService.get<Config['application']>('application');
    this.nodeEnv = nodeEnv;
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status: number;
    let message: string;
    let stack: string | undefined;
    let metadata: any;

    if (exception instanceof Error) {
      if (this.nodeEnv) {
        stack = exception.stack;
        this.logger.error(exception.message, exception.stack);
      } else {
        // this.logger.error(exception.message, exception.stack);
      }
    }

    switch (true) {
      case exception instanceof HttpException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        break;
      case exception instanceof QueryFailedError &&
        exception.driverError.code === '23505':
        status = HttpStatus.CONFLICT;
        message = 'Object with this field already exists';
        break;
      case exception instanceof EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        message = exception.message;
        break;
      case exception instanceof QueryFailedError &&
        exception.driverError.code === '23503':
        status = HttpStatus.CONFLICT;
        message = 'Cascade delete violation';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal Server Error';
        if (!(exception instanceof HttpException)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          metadata = { ...exception };
        }
        break;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message?.replaceAll(/\\/g, ''),
      ...(stack && { stack }),
      ...(metadata && { metadata }),
    });
  }
}
