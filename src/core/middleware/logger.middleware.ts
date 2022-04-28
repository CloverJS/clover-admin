import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * 日志中间件
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  /**
   * 支持依赖注入(通过constructor) (与提供者和控制器一样)
   */
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request... ${req.url} ${req.method}`);
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
