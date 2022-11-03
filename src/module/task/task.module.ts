import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
