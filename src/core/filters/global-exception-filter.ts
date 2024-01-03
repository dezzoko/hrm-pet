import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    console.log(exception);

    let status: number;
    let message: string;
    let metadata: any;
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
        metadata = exception;
        break;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message?.replaceAll(/\\/g, ''),
      metadata,
    });
  }
}
