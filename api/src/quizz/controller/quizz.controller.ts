import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('create')
  async create(
    @Body() createQuizzDto: CreateQuizzDto,
  ): Promise<CreateQuizzDto> {
    console.log('dto : ', createQuizzDto);
    return await this.QuizzService.create(createQuizzDto);
  }
}
