import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/user.enity';
import { TaskStatus } from './task.status.enum';

@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  description: string;

  @Column({
    type: 'varchar',
  })
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, {eager: false})
  @Exclude({toPlainOnly: true})
  user:User;
}
