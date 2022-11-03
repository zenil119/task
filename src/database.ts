import { join } from 'path';
import { DataSource } from 'typeorm';
import { User } from './module/auth/user.enity';
import { Task } from './module/task/task.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '0926',
  database: 'nest',
  synchronize: true,
  entities: [Task,User],
});

dataSource
  .initialize()
  .then(() => {
    console.log('DataSource initialize  successfully ');
  })
  .catch((err) => {
    console.error('dataSource initialize  error', err);
  });
