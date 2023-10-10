import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from '../score.entity';
import { ScoreDto } from '../dto/score.dto';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score) private ScoreRepository: Repository<Score>,
  ) {}

  async create(data) {
    await this.ScoreRepository.save(data);
  }
}
