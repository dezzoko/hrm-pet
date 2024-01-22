import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LogsMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl, body } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} ${
        request?.body && JSON.stringify(body)
      }`;

      // if (statusCode >= 500) {
      //   return this.logger.error(message);
      // }

      // if (statusCode >= 400) {
      //   return this.logger.warn(message);
      // }

      // return this.logger.log(message);
    });

    next();
  }
}

export default LogsMiddleware;
