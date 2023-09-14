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

  async getByTheme(theme): Promise<Quizz[]> {
    return await this.QuizzRepository.find({
      where: {
        theme,
      },
    });
  }

  async getById(id): Promise<Quizz> {
    return await this.QuizzRepository.find({
      where: {
        id,
      },
    });
  }

  async getItemsById(id): Promise<Item[]> {
    return await this.QuizzRepository.find({
      where: {
        id,
      },
    });
  }

  async create(createQuizzDto: CreateQuizzDto): Promise<CreateQuizzDto> {
    const quizz = await this.QuizzRepository.save(createQuizzDto);
    createQuizzDto.items.forEach(async (items) => {
      const currentItem: CreateItemDto = {
        name: items.name,
        category: items.category,
        quizz: quizz.id,
      };
      await this.ItemRepository.save(currentItem);
    });
    return quizz;
  }
}
