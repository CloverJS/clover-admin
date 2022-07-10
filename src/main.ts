import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './core/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'], // 日志级别
    cors: true, // 跨域
  });
  app.setGlobalPrefix('api'); // 全局路由前缀
  app.enableVersioning({
    // URI版本控制
    type: VersioningType.URI,
    defaultVersion: '1',
  }); // 默认版本为v1, 即api/v1/xxx
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
  await app.listen(process.env?.APP_PORT ?? 3000);
  process.env.URL = await app.getUrl();
  console.log(`Application is running on: ${process.env.URL}`);
}
bootstrap();
/**
 * 使用mssql如果遇到ssl问题, 则需要在ormconfig.json中添加如下options配置(现已默认添加, 但这将使用ssl的低版本,可能不安全)
 */
// {
//   //...其他配置
//   "options": {
//     "encrypt": false,
//     "trustServerCertificate": true,
//     "cryptoCredentialsDetails": {
//         "minVersion": "TLSv1"
//     }
//   }
// }
