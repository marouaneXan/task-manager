import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post('/create/:userId')
  @UseGuards(JwtAuthGuard)
  async createTask(@Body() taskData: Partial<Task>,@Param('userId') userId: string): Promise<Task> {
    return this.taskService.createTask(taskData,userId);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getTasks(): Promise<Task[]> {
    return this.taskService.getTasks()
  }
}
