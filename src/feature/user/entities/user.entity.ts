/**
 * User实体
 */

import { IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
import { Photo } from 'src/feature/photo/entities/photo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({
  name: 'user', // 数据库表名, 默认为类名
  orderBy: {
    // 使用find操作和QueryBuilder指定实体的默认排序
    firstName: 'ASC',
    id: 'DESC',
  },
})
export class User {
  // 创建一个自增的主键  -- @PrimaryColumn用于创建主键
  @PrimaryGeneratedColumn()
  id: number;

  // 设置列类型
  @Column({ type: 'varchar', length: 32, default: 'user' })
  firstName: string;

  @Column({
    default: '',
  })
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
  @IsMobilePhone('zh-CN')
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
  password: string;

  // mysql支持枚举
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT,
  })
  role: Role;

  // mssql不支持枚举
  // @Column({
  //   type: 'varchar',
  //   default: Role.STUDENT,
  // })
  // role: Role;

  // 使用@Generated装饰器创建具有生成值的列
  @Column()
  @Generated('uuid') // uuid值将自动生成并存储到数据库中。
  uuid: string;

  /**
   * 定义关系: 一个user可以有多个photo,那么就是一对多的关系
   */
  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Array<Photo>;

  // 一个特殊列，自动为实体插入日期。无需设置此列，该值将自动设置
  @CreateDateColumn()
  createTime: Date;

  // 一个特殊列，在每次调用实体管理器或存储库的save时，自动更新实体日期。无需设置此列，该值将自动设置。
  @UpdateDateColumn()
  updateTime: Date;

  // 一个特殊列，在每次调用实体管理器或存储库的save时自动增长实体版本（增量编号）。无需设置此列，该值将自动设置。
  @VersionColumn()
  version: any;
}
