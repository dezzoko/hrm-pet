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
  private readonly logger = new Logger('filter');
  private nodeEnv: string;
  constructor(private configService: ConfigService) {
    const { nodeEnv } =
      this.configService.get<Config['application']>('application');
    this.nodeEnv = nodeEnv;
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status: number;
    let message: string;
    let stack: string | undefined;
    let metadata: any;

    // const message = exception?.response?.message;
    switch (true) {
      case exception?.response?.message?.length > 0:
        status = exception.status;
        message = exception.response.message;
        break;
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
      case exception instanceof QueryFailedError &&
        exception.driverError.code === '23502':
        status = HttpStatus.CONFLICT;
        message = 'ExecConstraints';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal Server Error';
        if (!(exception instanceof HttpException)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          metadata = { ...exception };
        }
        break;
    }

    if (exception instanceof Error && !(exception instanceof HttpException)) {
      stack = exception.stack;
      this.logger.error(
        exception['status'],
        exception.message,
        exception?.['status'] !== 404 ? exception.stack : undefined,
      );
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      ...(stack && { stack }),
      ...(metadata && { metadata }),
    });

    return;
  }
}
