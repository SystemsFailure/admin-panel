import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { transports, format } from 'winston';
import { loggerController } from 'src/utils/loggers/Logger';

@Injectable()
export class LoggerMiddlewareByControllers implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        loggerController
            .info(
                ` method: ${req.method}, ip-address: ${req.ip}, protocol: ${req.protocol}, statusCode: ${req.statusCode}, endpoint-base: ${req.baseUrl}, endpoint-method: ${req.path} `
            )
        next();
    }
}