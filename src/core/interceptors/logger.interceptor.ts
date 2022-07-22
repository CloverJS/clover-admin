import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { cutOffStringEnd } from 'src/utils/string.util';
import { MyLogger } from '../logger/my-logger.service';

/**
 * 日志拦截器
 */

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly myLogger: MyLogger, // 注入日志服务
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controller = context.getClass().name; // 获取当前处理的Controller名称
    const action = context.getHandler().name; // 获取当前处理的Controller中的方法的名称
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse(); // 包含一个关键信息: statusCode: 200
    const headers = request.headers; // 获取请求头
    const method = request.method;
    const url = request.url;
    const query = request.query;
    const body = request.body;
    const now = Date.now();

    this.myLogger.setContext(controller); // 设置日志上下文

    return next.handle().pipe(
      tap((data) => {
        //TODO 需要注意的是, 此部分的程序是在响应返回前执行的, 如果接口未通过参数校验被拦截, 则不会执行此部分
        const time = `${Date.now() - now}ms`; // 响应执行时间
        console.log(data); // 这里的res就是响应的内容{code: ..., data: ..., message: ...}
        const message = `(${action}) Request... ${url} ${method} ${
          response.statusCode
        } ${time}
    body: ${JSON.stringify(body)}
    query: ${JSON.stringify(query)}
    user-agent: ${headers['user-agent']}
    `;
        if (response.statusCode.toString().startsWith('2')) {
          this.myLogger.log(
            `${message}resData: ${cutOffStringEnd(
              JSON.stringify(data),
              256,
              '...',
            )}`,
          ); // 记录请求日志
        } else {
          this.myLogger.error(`${message}resData: ${JSON.stringify(data)}`); // 记录请求日志
        }
      }),
    );
  }
}
