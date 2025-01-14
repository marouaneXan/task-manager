import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createTask(taskData: Partial<Task>, userId: string): Promise<Task> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Task with ID ${userId} not found`);
    }
    const newTask = this.taskRepository.create({
      ...taskData,
      user: user,
    });
    if (newTask)
      Object.assign(user, {
        ...user,
        nombre_tasks: user.nombre_tasks+1,
      });
    await this.userRepo.save(user);
    return await this.taskRepository.save(newTask);
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }
}
