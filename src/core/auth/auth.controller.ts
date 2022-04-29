import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Result } from 'src/common/interfaces/result.interface';
import { CreateUserDto } from 'src/feature/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    const token = await this.authService.login(req.user);
    return { code: 200, message: '登录成功', data: { token } };
  }

  //TODO 目前验证失败的返回稍有问题, 原因应该是自定义的错误拦截器和验证器抛出错误的兼容问题
  @UsePipes(new ValidationPipe({ transform: true })) // controller层开启验证转换, 开启后, '14' => 14
  @Post('register')
  async register(
    // 如果有必要, 可以开启显示类型转换
    //@Param('id', ParseIntPipe) id: number,
    //@Query('sort', ParseBoolPipe) sort: boolean,
    @Body() createUserDto: CreateUserDto,
    // 如果需要验证数组,请使用ParseArrayPipe
    // @Body(new ParseArrayPipe({ items: CreateUserDto }))
    // createUserDtos: CreateUserDto[],
  ): Promise<Result> {
    await this.authService.register(createUserDto);
    return { code: 200, message: '注册成功' };
  }
}
