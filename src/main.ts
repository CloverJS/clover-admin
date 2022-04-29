import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './core/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'], // 日志级别
    cors: true, // 跨域
  });
  app.setGlobalPrefix('api/v1'); // 全局路由前缀
  app.use(logger); // 全局日志中间件
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false, // 禁用详细错误信息(开启后不会再返回详细的错误信息)
      whitelist: true, // 自动去除非白名单内的属性(即验证类中没有声明的属性)
      forbidNonWhitelisted: false, // 开启后, 如果出现非白名单内的属性, 将不再是自动去除而是抛出错误
      transform: false, // 全局开启转换器(默认关闭, 多数情况是在controller层开启)---开启后, '14' => 14
    }),
  ); // 全局启用验证
  // 如果遇到请求实体太大的问题, 可揭开下面的注释
  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ limit: '50mb', extended: true }));
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
/**
 * 使用mssql如果遇到ssl问题, 则需要添加ormconfig.json中的options配置(现已默认添加, 但这使用ssl的低版本,可能不安全)
 */
