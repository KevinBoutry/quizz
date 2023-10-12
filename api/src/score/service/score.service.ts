import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from '../score.entity';
import { Quizz } from 'src/entities';
import { User } from 'src/entities';
import { ScoreDto } from '../dto/score.dto';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score) private ScoreRepository: Repository<Score>,
  ) {}

  async create(data) {
    return await this.ScoreRepository.save(data);
  }

  async updateScore(data) {
    return await this.ScoreRepository.update(
      { id: data.id },
      {
        score: data.score,
        time: data.time,
      },
    );
  }

  async updateStars(data) {
    return await this.ScoreRepository.update(
      { id: data.id },
      {
        stars: data.stars,
      },
    );
  }

  async alreadyPlayed(data) {
    console.log('data service', data);
    return await this.ScoreRepository.find({
      relations: ['quizz', 'user'],
      where: {
        quizz: {
          id: data.quizz,
        },
        user: {
          id: data.user,
        },
      },
    });
  }
}
