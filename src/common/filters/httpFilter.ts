import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

import { Response, Request } from "express";

// 接口异常拦截器
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        response.status(status).json({
            success: false,
            time: new Date(),
            msg: exception.message,
            status,
            path: request.url
        })
    }
}