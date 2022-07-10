import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Mark } from '../enums/mark.enum';

/**
 * 抽象实体: 提供操作记录抽象
 */
export abstract class Action {
  // 一个特殊列，自动为实体插入日期。无需设置此列，该值将自动设置
  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  // 一个特殊列，在每次调用实体管理器或存储库的save时，自动更新实体日期。无需设置此列，该值将自动设置。
  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  // 一个特殊列，在每次调用实体管理器或存储库的save时自动增长实体版本（增量编号）。无需设置此列，该值将自动设置。
  @VersionColumn({
    comment: '版本号: 记录更新次数',
  })
  version: any;

  @Column({
    type: 'enum',
    enum: Mark,
    default: Mark.NORMAL,
    comment: '标记',
  })
  mark: Mark;
}
