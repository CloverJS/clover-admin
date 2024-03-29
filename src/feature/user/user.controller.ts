import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Result } from 'src/common/interfaces/result.interface';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { DatetimeInterceptor } from 'src/core/interceptors/datetime.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // 对此controller层的所有节点开启token校验和鉴权
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 查询所有用户
   */
  @Get('/')
  @Roles(Role.ADMIN) // 限定此接口仅对ADMIN开放
  @UseInterceptors(DatetimeInterceptor) // 格式化返回值中的时间
  async getAllUsers(): Promise<Result<User>> {
    const users = await this.userService.findAll();
    return { code: 200, message: '获取成功', data: { list: users } };
  }

  /**
   * 新增用户
   */
  @Post('/')
  async createOne(
    // 默认201: 已创建。成功请求并创建了新的资源
    @Body() createUserDto: CreateUserDto,
  ): Promise<Result<void>> {
    await this.userService.createOne(createUserDto);
    return { code: 200, message: '创建成功' };
  }

  /**
   * 查询指定用户
   */
  @UseInterceptors(ClassSerializerInterceptor) // 排除指定字段(会排除UserEntity中被Exclude装饰器修饰的字段)
  // @SerializeOptions({ excludePrefixes: ['_'] }) // ClassSerializerInterceptor的默认行为可以被覆盖, 比如此处将排除以_开头的字段
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Result<User>> {
    const user = await this.userService.findOne(id);
    return { code: 200, message: '获取成功', data: { list: [user] } };
  }

  /**
   * 更新指定用户
   */
  @Put('/:id')
  async updateOne(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Result<void>> {
    await this.userService.updateOne(id, updateUserDto);
    return { code: 200, message: '更新成功' };
  }

  /**
   * 删除指定用户
   */
  @Delete('/:id')
  async removeOne(@Param('id') id: number): Promise<Result<void>> {
    await this.userService.removeOne(id);
    return { code: 200, message: '删除成功' };
  }

  /**
   * 批量新增用户
   */
  @Post('/many')
  async createMany(@Body() users: Array<User>): Promise<Result<void>> {
    await this.userService.createMany(users);
    return { code: 200, message: '创建成功' };
  }
}
