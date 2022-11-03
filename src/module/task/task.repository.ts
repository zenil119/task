import { dataSource } from 'src/database';
import { User } from '../auth/user.enity';
import { FilterTaskDto } from './dto/SearchTask.dto';
import { Task } from './task.entity';

export const taskRepository = dataSource.getRepository(Task).extend({
  async getAllTask(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    const { status, search } = filterTaskDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status= :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  },
});
