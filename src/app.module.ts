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
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    // 将 TypeOrmModule 导入AppModule,并使用ormconfig.json中的配置
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      // 配置静态服务目录---访问: http://localhost:3000/fileUpload/2022-04-27/xxx.png
      rootPath: join(__dirname, '..', 'client'),
    }),
    UserModule,
    FileModule,
    AuthModule,
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
