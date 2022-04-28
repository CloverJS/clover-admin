import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

// 错误拦截器
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error, caught): any => {
        if (error instanceof HttpException) {
          return Promise.resolve({
            code: error.getStatus(),
            message: error.getResponse(),
          });
        }
        return Promise.resolve({
          code: 500,
          message: `出现了意外错误：${error.toString()}`,
        });
      }),
    );
  }
}
