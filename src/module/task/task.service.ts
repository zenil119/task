import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { FilterTaskDto } from './dto/SearchTask.dto';
import { Task } from './task.entity';
import { taskRepository } from './task.repository';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TaskService {
  async getAllTask(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    return await taskRepository.getAllTask(filterTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} is not found..`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await taskRepository.save(task);
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const result = await taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} is not found..`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus) {
    const task = await this.getTaskById(id);
    task.status = status;
    await taskRepository.save(task);
    return task;
  }
}
