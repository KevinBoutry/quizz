import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}
  async getAll(): Promise<User[]> {
    return await this.UserRepository.find();
  }

  async create(user: User): Promise<User> {
    return await this.UserRepository.create(user);
  }

  async getOne(userid: any): Promise<User> {
    return await this.UserRepository.findOne(userid);
  }

  async update(userid: number, user: User): Promise<UpdateResult> {
    return await this.UserRepository.update(userid, user);
  }

  async delete(userid: number): Promise<DeleteResult> {
    return await this.UserRepository.delete(userid);
  }
}
