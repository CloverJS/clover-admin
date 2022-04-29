
/**
 * photo实体
 */

import { User } from 'src/feature/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  // 在 @ManyToOne 一侧，即在外键拥有者一侧，设置 onDelete，就可以使用外键的级联功能，这里设置级联删除，当删除 user 时，user 的所有 post 会被级联删除
  @ManyToOne((type) => User, (user) => user.photos, {
    onDelete: 'CASCADE',
  })
  user: User;
}
