import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>
    ){}

    async createUser(userData:Partial<User>):Promise<User>{
        const newUser= this.userRepository.create(userData)
        return await this.userRepository.save(newUser)
    }

    async getAllUsers() : Promise<User[]>{
        return await this.userRepository.find()
    }
    
}
