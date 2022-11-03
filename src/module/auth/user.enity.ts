import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../task/task.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true
  })
  username: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @OneToMany((_type) => Task, (task)=> task.user, {eager:true})
  tasks: Task[];
}
