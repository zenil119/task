import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { FilterTaskDto } from './dto/SearchTask.dto';
import { UpdateTaskStatusDto } from './dto/UpdateTask.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('/all')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async getTasks(@Query() filterTaskDto: FilterTaskDto): Promise<Task[]> {
    return await this.taskService.getAllTask(filterTaskDto);
  }

  @Get('/:id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  @Post('/create')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createTask(@Body() task: CreateTaskDto) {
    return await this.taskService.createTask(task);
  }

  @Delete('/delete/:id')
  @HttpCode(202)
  @UsePipes(ValidationPipe)
  async deleteTask(@Param('id') id: number): Promise<void> {
    return await this.taskService.deleteTask(id);
  }

  @Patch('update/:id/status')
  @HttpCode(204)
  @UsePipes(ValidationPipe)
  async updateTaskStatus(
    @Param('id') id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return await this.taskService.updateTaskStatus(id, status);
  }
}
