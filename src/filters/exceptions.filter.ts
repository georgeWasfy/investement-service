import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    this.logger.error(exception, 'Error in request');

    response.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}
