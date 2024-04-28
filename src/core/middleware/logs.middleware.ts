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

      if (statusCode >= 400) {
        this.logger.warn(message);
        return;
      }
      if (statusCode >= 500) {
        this.logger.error(message);
      }

      this.logger.log(message);
    });
    return next();
  }
}

export default LogsMiddleware;
