import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { QuizzService } from '../service/quizz.service';
import { CreateQuizzDto } from '../dto/quizz.dto';
import { Quizz } from '../quizz.entity';
import { Item } from '../item.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('quizz')
export class QuizzController {
  constructor(private QuizzService: QuizzService) {}

  @Get()
  async getAll(): Promise<Quizz[]> {
    return await this.QuizzService.getAll();
  }

  @Get('recent')
  async getRecent() {
    return await this.QuizzService.getRecent();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Quizz> {
    return await this.QuizzService.getById(id);
  }

  @Get('themes/:theme')
  async getByTheme(@Param('theme') theme: string) {
    return await this.QuizzService.getByTheme(theme);
  }

  //   @Get(':id/items')
  //   async getItemsById(@Param('id') id: number): Promise<Item[]> {
  //     return await this.QuizzService.getItemsById(id);
  //   }

  @Post('create')
  @UseInterceptors(FilesInterceptor('image'))
  async create(@UploadedFiles() image, @Body('data') data) {
    console.log(data);
    return await this.QuizzService.create(image, JSON.parse(data));
  }
}
