/**
 * User实体
 */

import { IsMobilePhone, IsNotEmpty } from 'class-validator';
import { ActionWithUser } from 'src/common/entities/action-with-user.entity';
import { Role } from 'src/common/enums/role.enum';
import { Photo } from 'src/feature/photo/entities/photo.entity';
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity({
  name: 'user', // 数据库表名, 默认为类名
  orderBy: {
    // 使用find操作和QueryBuilder指定实体的默认排序
    firstName: 'ASC',
    id: 'DESC',
  },
})
export class User {
  // 构造函数, 用户构建实体
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  // 创建一个自增的主键  -- @PrimaryColumn用于创建主键
  @PrimaryGeneratedColumn()
  id: number;

  // 设置列类型
  @Column({ type: 'varchar', length: 32, default: 'user' })
  @IsNotEmpty() // createUserDto是从User映射而来, 如果为验证开启了自动过滤非白名单字段, 这里不设置不为空在createUserDto中此字段会被忽略
  firstName: string;

  @Column({
    default: '',
  })
  @IsNotEmpty()
  lastName: string;

  // 设置列默认值
  @Column({ default: true })
  isActive: boolean;

  // 更加完整的常用参数配置
  @Column({
    type: 'varchar', // 列类型
    name: 'phone', // 数据库表中的列名(默认为属性名)
    length: 16, // 列长度
    nullable: false, // 列可否为空(默认false)
    select: true, // 查询时是否隐藏此列,设为false则列数据不会显示标准查询(默认true)
    default: '123456', // 数据库级的默认值
    primary: false, // 标记为主列(作用等同于@PrimaryColumn)
    unique: false, // 将列标记为唯一列(创建唯一约束)
    comment: '用户手机号', // 数据库列备注
  })
  // 值校验: 是否是手机号
  @IsMobilePhone('zh-CN', {
    message: '手机号格式不正确', // 自定义验证失败信息
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    select: true,
    default: '123456',
    primary: false,
    unique: false,
    comment: '用户密码',
  })
  // 值校验: 是否不为空
  @IsNotEmpty()
  @Exclude() // 使用class-transformer的@Exclude()装饰器来排除此字段
  password: string;

  //TODO mysql支持枚举
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT,
  })
  // @Transform(role => role.name) // 如果Role是对象而查询时仅仅希望获取到Role.name, 可使用class-transformer的@Transform()装饰器来转换此字段
  role: Role;

  //TODO mssql不支持枚举
  // @Column({
  //   type: 'varchar',
  //   default: Role.STUDENT,
  // })
  // role: Role;

  // 使用@Generated装饰器创建具有生成值的列
  @Column()
  @Generated('uuid') // uuid值将自动生成并存储到数据库中。
  uuid: string;

  // 使用嵌入式实体
  @Column((type) => ActionWithUser)
  action: ActionWithUser;

  /**
   * 定义关系: 一个user可以有多个photo,那么就是一对多的关系
   */
  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Array<Photo>;

  // 使用class-transformer的@Expose()装饰器来暴露此字段(这类似于计算属性)
  @Expose()
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
