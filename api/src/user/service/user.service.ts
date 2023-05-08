import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/user.dtos';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}
  async getAll(): Promise<User[]> {
    return await this.UserRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const hash = await argon.hash(createUserDto.password);
    createUserDto.password = hash;  
    return await this.UserRepository.save(createUserDto);
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
