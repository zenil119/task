import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/module/auth/user.enity';
import { Task } from 'src/module/task/task.entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '0926',
  database: 'nest',
  entities: [Task, User],
  synchronize: true,
  autoLoadEntities: true,
};
