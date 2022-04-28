import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  /**
   * 此模块使用 forFeature() 方法定义在当前范围中注册哪些存储库
   * 这样，就可以使用 @InjectRepository()装饰器将 UsersRepository 注入到 UsersService
   */
  imports: [TypeOrmModule.forFeature([User]), CommonModule],
  controllers: [UserController],
  providers: [
    UserService,
    // 在整个模块中开启token校验和鉴权  -- !注意: 如果有其他模块希望访问此模块export的service也会先经过校验. 而且务必确保JwtAuthGuard在RolesGuard之前
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
  /**
   * 通过导出整个模块来实现: 在导入TypeOrmModule.forFeature 的模块之外使用存储库
   */
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
