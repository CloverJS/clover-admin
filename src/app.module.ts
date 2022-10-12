import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './feature/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './core/interceptors/errors.interceptor';
import { FileModule } from './feature/file/file.module';
import { AuthModule } from './core/auth/auth.module';
import { PhotoModule } from './feature/photo/photo.module';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { ConfigEnum } from './config/config.enum';
import { LoggerModule } from './core/logger/logger.module';

@Module({
  imports: [
    /** 导入config模块 */
    ConfigModule.forRoot({
      envFilePath: `./src/config/${ConfigEnum[process.env?.NODE_ENV ?? 'development']}.env`, // 自定义env文件路径
      load: [appConfig], // 自定义配置文件
      isGlobal: true, // 设为全局模块
    }),
    /**
     * 将 TypeOrmModule 导入AppModule,并使用ormconfig.json中的配置
     * 其中entities - 要加载并用于此连接的实体。接受要加载的实体类和目录路径
     * synchronize - 指示是否在每次应用程序启动时自动创建数据库架构,生成环境下请务必设为false
     *  - 使用mssql如果遇到项目启动表未创建, 可以设置为true, 在表创建后再设为false
     * 设置autoLoadEntities为true即可自动载入实体---每个通过forFeature()注册的实体都会自动添加到配置对象的entities数组中
     */
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      // 配置静态服务目录---访问: http://localhost:3000/client目录内/xxx.png
      rootPath: join(__dirname, '..', 'client'),
    }),
    LoggerModule,
    FileModule,
    AuthModule,
    UserModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, // 全局拦截器，这里使用全局异常拦截器改写异常消息结构
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {
  // 注入TypeORM 的Connection对象
  constructor(private readonly connection: Connection) {}
}
