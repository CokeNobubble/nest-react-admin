import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


interface Data<T> {
    data: T
}

// 全局响应拦截器
// 对接口响应数据进行统一处理
@Injectable()
export class GlobalResponse<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
        return next.handle().pipe(map(data => {
            return {
                data,
                code: 0,
                message: "成功",
                success: true
            }
        }))
    }
}