import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { QuizzService } from '../service/quizz.service';
import { CreateQuizzDto } from '../dto/quizz.dto';
import { Quizz } from '../quizz.entity';

@Controller('quizz')
export class QuizzController {
  constructor(private QuizzService: QuizzService) {}

  @Get()
  async getAll(): Promise<Quizz[]> {
    return await this.QuizzService.getAll();
  }

  @Get(':theme')
  async getByTheme(@Param('theme') theme: string): Promise<Quizz[]> {
    return await this.QuizzService.getByTheme(theme);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Quizz> {
    return await this.QuizzService.getById(id);
  }

  @Post('create')
  async create(
    @Body() createQuizzDto: CreateQuizzDto,
  ): Promise<CreateQuizzDto> {
    return await this.QuizzService.create(createQuizzDto);
  }
}
