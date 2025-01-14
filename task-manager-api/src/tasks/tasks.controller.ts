import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post('/create/:userId')
  async createTask(@Body() taskData: Partial<Task>,@Param('userId') userId: string): Promise<Task> {
    return this.taskService.createTask(taskData,userId);
  }

  @Get('')
  async getTasks(): Promise<Task[]> {
    return this.taskService.getTasks()
  }
}
