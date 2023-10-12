import { Controller, Post, Body, Put, Get, Param } from '@nestjs/common';
import { ScoreService } from '../service/score.service';

@Controller('score')
export class ScoreController {
  constructor(private ScoreService: ScoreService) {}

  @Post('publish')
  async create(@Body() data) {
    return await this.ScoreService.create(data);
  }

  @Put('update')
  async updateStars(@Body() data) {
    return await this.ScoreService.updateScore(data);
  }

  @Put('stars')
  async updateStars(@Body() data) {
    return await this.ScoreService.updateStars(data);
  }

  @Get('played/:quizz/:user')
  async alreadyPlayed(@Param('quizz') quizz, @Param('user') user) {
    console.log('data controller', quizz, user);
    return await this.ScoreService.alreadyPlayed({ quizz, user });
  }
}
