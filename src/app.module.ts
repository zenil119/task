import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfig } from './config/db.config';
import { TaskModule } from './module/task/task.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [TaskModule, AuthModule, TypeOrmModule.forRoot(typeormConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
