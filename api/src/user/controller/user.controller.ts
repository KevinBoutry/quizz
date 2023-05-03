import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../user.entity';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.UserService.getAll();
  }

  @Get(':userid')
  async getOne(@Param() userid: number): Promise<User> {
    return await this.UserService.getOne(userid);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    console.log(user);
    return await this.UserService.create(user);
  }

  @Delete(':userid')
  async delete(@Param() userid: number): Promise<DeleteResult> {
    return await this.UserService.delete(userid);
  }

  @Put(':userid')
  async update(
    @Param() userid: number,
    @Body() user: User,
  ): Promise<UpdateResult> {
    return await this.UserService.update(userid, user);
  }
}
