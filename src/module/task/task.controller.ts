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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';
import { GetUser } from '../auth/get-decoretor';
import { User } from '../auth/user.enity';
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
  @UseGuards(AuthGuard())
  async getTasks(
    @Query() filterTaskDto: FilterTaskDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return await this.taskService.getAllTask(filterTaskDto, user);
  }

  @Get('/:id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async getTaskById(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.taskService.getTaskById(id, user);
  }

  @Post('/create')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async createTask(@Body() task: CreateTaskDto, @GetUser() user: User) {
    return await this.taskService.createTask(task, user);
  }

  @Delete('/delete/:id')
  @HttpCode(202)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async deleteTask(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return await this.taskService.deleteTask(id, user);
  }

  @Patch('update/:id/status')
  @HttpCode(204)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async updateTaskStatus(
    @Param('id') id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return await this.taskService.updateTaskStatus(id, status, user);
  }
}
