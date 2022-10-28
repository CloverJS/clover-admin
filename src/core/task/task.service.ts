import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { MyLogger } from '../logger/my-logger.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly myLogger: MyLogger, // 注入日志服务
  ) {
    this.myLogger.setContext(TaskService.name); // 设置日志上下文
  }

  /** 该方法每分钟执行一次，在第 30 秒执行 */
  // @Cron('30 * * * * *')
  @Cron(CronExpression.EVERY_30_SECONDS) // 等价的枚举写法
  handleCron() {
    this.myLogger.log('Called when the second is 45');
  }

  /** 该方法每隔10秒执行一次 */
  @Interval(10000)
  handleInterval() {
    this.myLogger.log('Called every 10 seconds');
  }

  /** 该方法在应用启动后的第5秒执行一次 */
  @Timeout(5000)
  handleTimeout() {
    this.myLogger.log('Called once after 5 seconds');
  }
}
