import { ConsoleLogger, Injectable, Scope, LogLevel } from '@nestjs/common';
import { createWriteStream, WriteStream } from 'fs';
import { createFile, createFolder } from 'src/utils/file.util';

@Injectable({ scope: Scope.TRANSIENT }) // 指定瞬态作用域
export class MyLogger extends ConsoleLogger {
  protected logLevel: LogLevel;
  protected logWS: WriteStream;
  protected errWS: WriteStream;
  protected logFolderPath = './logs';
  protected infoLogPath = './logs/info.log';
  protected errLogPath = './logs/error.log';

  constructor() {
    super();
    this.createLog();
  }

  // 通过覆盖默认方法实现自定义日志输出
  log(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    this.logLevel = 'log';
    this.logWS?.write(this.formatLog(message), 'utf8');
    // eslint-disable-next-line prefer-rest-params
    super.log.apply(this, arguments);
  }

  debug(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    this.logLevel = 'debug'; // warn log error debug
    this.logWS.write(this.formatLog(message), 'utf8');
    // eslint-disable-next-line prefer-rest-params
    super.debug.apply(this, arguments);
  }

  warn(message: any, context?: string) {
    // add your tailored logic here
    this.logLevel = 'warn'; // warn log error debug
    this.logWS.write(this.formatLog(message), 'utf8');
    // eslint-disable-next-line prefer-rest-params
    super.warn.apply(this, arguments);
  }

  verbose(message: any, context?: string) {
    // add your tailored logic here
    this.logLevel = 'verbose'; // warn log error debug
    this.logWS.write(this.formatLog(message), 'utf8');
    // eslint-disable-next-line prefer-rest-params
    super.verbose.apply(this, arguments);
  }

  error(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    this.logLevel = 'error'; // warn log error debug
    this.logWS.write(this.formatLog(message), 'utf8');
    this.errWS.write(this.formatLog(message), 'utf8');
    // eslint-disable-next-line prefer-rest-params
    super.error.apply(this, arguments);
  }

  // 甚至可以添加自定义的方法
  customLog() {
    // add your tailored logic here
    console.log('这是自定义的日志输出方法');
  }

  /** 创建日志相关文件 */
  protected async createLog(): Promise<void> {
    try {
      const createTask: Promise<void | NodeJS.ErrnoException>[] = [];
      createTask.push(this.createLogFile(this.infoLogPath));
      createTask.push(this.createLogFile(this.errLogPath));
      await this.createLogFolder(this.logFolderPath);
      await Promise.all(createTask);
      this.openLogStream();
    } catch (err) {
      console.log(err);
    }
  }

  /** 打开日志写入流 */
  protected openLogStream(): void {
    this.logWS = createWriteStream(this.infoLogPath, { flags: 'a' });
    this.errWS = createWriteStream(this.errLogPath, { flags: 'a' });
  }

  /** 关闭日志流 */
  protected closeLogStream() {
    this.logWS.end();
    this.errWS.end();
  }

  /** 创建日志文件夹 */
  protected createLogFolder(path: string): Promise<void> {
    return createFolder(path);
  }

  /** 创建日志文件 */
  protected createLogFile(path: string) {
    return createFile(path);
  }

  /** 格式化日志 */
  protected formatLog(message: any) {
    return `${this.formatMessage(
      this.logLevel,
      message,
      this.formatPid(process.pid),
      this.logLevel.toUpperCase().padStart(7, ' '),
      this.context ? `[${this.context}] ` : '',
      '',
    )}
    `
      .split(/\[95m|\[96m|\[39m|\[33m|\[32m|\[31m/g) // 过滤掉控制台颜色标识
      .join('');
  }
}
