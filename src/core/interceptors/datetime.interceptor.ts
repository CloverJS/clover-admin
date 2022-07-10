import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Result } from 'src/common/interfaces/result.interface';
import { dateFormat } from 'src/utils/date-format.util';

@Injectable()
export class DatetimeInterceptor<T> implements NestInterceptor<T, Result<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Result<T>> | Promise<Observable<Result<T>>> {
    return next.handle().pipe(
      map((data) => {
        // data: { code: 200, message: '获取成功', data: [{ createTime: '2020-01-01', ... }, ...] }
        // 主要处理data.data.list
        data.data.list = this.formatDatetime(data.data.list);
        return data;
      }),
    );
  }
  /**
   * 格式化返回数据中的日期格式
   */
  formatDatetime(list: any): any {
    if (list instanceof Array) {
      list.forEach((item) => {
        item = this.formatDatetime(item);
      });
    } else if (list instanceof Object) {
      // 遍历对象所有键, 并都执行递归
      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          // 将键名中包含'time'的键值, 转换为标准日期格式
          if (key.match(/time/i)) {
            // 格式化时间
            list[key] = dateFormat(list[key]);
          } else if (
            list[key] instanceof Object ||
            list[key] instanceof Array
          ) {
            list[key] = this.formatDatetime(list[key]);
          }
        }
      }
    }
    return list;
  }
}
