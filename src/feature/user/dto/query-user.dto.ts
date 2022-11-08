import { PickType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from 'src/common/enums/role.enum';
import { Page } from 'src/common/interfaces/page.interface';
import { User } from '../entities/user.entity';

export class QueryUserDto
  extends PickType(User, ['firstName', 'lastName', 'phone'] as const)
  implements Page
{
  // 可以使用@IsEnum()装饰器来指定枚举类型
  @IsEnum(Role)
  @ValidateIf((o) => o?.role) // 条件验证, 只有当role存在时才验证
  role?: Role;
  @IsNumber()
  @Transform(({ value: page }) => Number(page)) // 转换入参数据类型
  page: number;
  @IsNumber()
  @Transform(({ value: page }) => Number(page))
  pageSize: number;
  getSkip(): number {
    return (this.page - 1) * this.pageSize;
  }
}
