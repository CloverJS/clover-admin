import { User } from 'src/feature/user/entities/user.entity';
import { JoinColumn, ManyToOne } from 'typeorm';
import { Action } from './action.entity';

/**
 * 嵌入式实体: 附带操作人的操作记录
 */
export class ActionWithUser extends Action {
  constructor(user: User) {
    super();
    this.operator = user;
  }
  // 操作人
  @ManyToOne((type) => User, {
    nullable: true,
  })
  @JoinColumn({ name: 'operatorId' })
  operator: User;
}