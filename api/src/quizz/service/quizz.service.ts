import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Quizz } from '../quizz.entity';
import { CreateQuizzDto } from '../dto/quizz.dto';

@Injectable()
export class QuizzService {
    constructor(
        @InjectRepository(Quizz) private QuizzRepository: Repository<Quizz>,
    ) {}

    async getAll(): Promise<Quizz[]>{
        return await this.QuizzRepository.find();
    }

    async create(createQuizzDto : CreateQuizzDto) : Promise<CreateQuizzDto> {
        return await this.QuizzRepository.save(createQuizzDto)
    }
}
