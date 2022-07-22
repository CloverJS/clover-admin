import { MyLogger } from './my-logger.service';
import { Global, Module } from '@nestjs/common';

/**
 * 日志模块
 * 将此模块申明为全局模块, 以便在任何地方使用MyLogger
 */
@Global()
@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
