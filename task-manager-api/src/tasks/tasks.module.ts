import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),TypeOrmModule.forFeature([User])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
