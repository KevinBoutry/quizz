import { Controller, Post, Body } from '@nestjs/common';
import { ScoreService } from '../service/score.service';

@Controller('score')
export class ScoreController {
  constructor(private ScoreService: ScoreService) {}

  @Post('update')
  async create(@Body() data) {
    return await this.ScoreService.create(data);
  }
}
