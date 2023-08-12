import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from "express";


@Catch(HttpException) // Здесь можешь передать массив exceptions
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx_http = host.switchToHttp();
        const response = ctx_http.getResponse<Response>();
        const request = ctx_http.getRequest<Request>();
        const status = exception.getStatus();
        

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            })
    }
}