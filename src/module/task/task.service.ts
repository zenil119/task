import { Injectable, NotFoundException } from '@nestjs/common';
import { Console } from 'console';
import { User } from '../auth/user.enity';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { FilterTaskDto } from './dto/SearchTask.dto';
import { Task } from './task.entity';
import { taskRepository } from './task.repository';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TaskService {
  async getAllTask(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    return await taskRepository.getAllTask(filterTaskDto, user);
  }

  async getTaskById(id: number, user: User | any): Promise<Task> {
    const task = await taskRepository.findOne({ where: { id, user } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} is not found..`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await taskRepository.save(task);
    return task;
  }

  async deleteTask(id: number, user: User | any): Promise<void> {
    const result = await taskRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} is not found..`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: User) {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await taskRepository.save(task);
    return task;
  }
}
