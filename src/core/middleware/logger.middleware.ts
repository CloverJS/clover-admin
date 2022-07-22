import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from '../logger/my-logger.service';

/**
 * 日志中间件
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  /**
   * 支持依赖注入(通过constructor) (与提供者和控制器一样)
   */
  constructor(
    private readonly myLogger: MyLogger, // 注入日志服务
  ) {
    this.myLogger.setContext(LoggerMiddleware.name); // 设置日志上下文
  }
  use(req: Request, res: Response, next: NextFunction) {
    this.myLogger.log(`Request... ${req.url} ${req.method}
    body: ${JSON.stringify(req.body)}
    query: ${JSON.stringify(req.query)}
    user-agent: ${req.headers['user-agent']}`); // 记录请求日志
    next();
  }
}

/**
 * 函数式日志中间件
 */
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.url} ${req.method}`);
  next();
}
