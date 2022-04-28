import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
// 第二个参数默认是jwt, 当然可以更改, 使用: @AuthGuard('jwt')
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log('jwt', payload);
    // 此处可以执行其他逻辑操作: 如查询数据以获取完整的user对象
    return { id: payload.sub, phone: payload.phone, roles: payload.role };
  }
}
