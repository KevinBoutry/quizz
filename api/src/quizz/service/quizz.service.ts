import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Quizz } from '../quizz.entity';
import { Item } from '../item.entity';
import { CreateQuizzDto } from '../dto/quizz.dto';
import { CreateItemDto } from '../dto/item.dto';

@Injectable()
export class QuizzService {
  constructor(
    @InjectRepository(Quizz) private QuizzRepository: Repository<Quizz>,
    @InjectRepository(Item) private ItemRepository: Repository<Item>,
  ) {}

  async getAll(): Promise<Quizz[]> {
    return await this.QuizzRepository.find();
  }

  async create(createQuizzDto: CreateQuizzDto): Promise<CreateQuizzDto> {
    console.log('jarrive au service', createQuizzDto);
    const quizz = await this.QuizzRepository.save(createQuizzDto);
    createQuizzDto.items.forEach(async (items) => {
      console.log(quizz.id);
      const currentItem: CreateItemDto = {
        name: items.name,
        category: items.category,
        quizzId: quizz.id,
      };
      await this.ItemRepository.save(currentItem);
    });
    return quizz;
  }
}
