import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Quizz } from '../quizz.entity';
import { Item } from '../item.entity';
import { CreateQuizzDto } from '../dto/quizz.dto';
import { CreateItemDto } from '../dto/item.dto';
import * as fs from 'fs-extra';

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

  async getById(id) {
    const tempQuizz = await this.QuizzRepository.findOneBy({
      id,
    });
    if (tempQuizz) {
      tempQuizz.items = await this.ItemRepository.find({
        relations: ['quizz'],
        where: {
          quizz: {
            id,
          },
        },
      });
    }
    const quizz = {
      ...tempQuizz,
      categories: [],
    };
    delete quizz.items;

    const categorySet = new Set();
    tempQuizz.items.forEach((item) => {
      categorySet.add(item.category);
    });
    const categories = Array.from(categorySet);
    categories.forEach((cat) => {
      quizz.categories.push({ catName: cat, items: [] });
    });
    tempQuizz.items.forEach((item) => {
      const idx = quizz.categories.findIndex(
        (cat) => cat.catName === item.category,
      );
      quizz.categories[idx].items.push(item.name);
    });
    return quizz;
  }

  async create(image, createQuizzDto) {
    const savedQuizz = await this.QuizzRepository.save(createQuizzDto);
    createQuizzDto.items.forEach(async (items) => {
      const currentItem: CreateItemDto = {
        name: items.name,
        category: items.category,
        quizz: savedQuizz.id,
      };
      await this.ItemRepository.save(currentItem);
    });
    console.log(image);
    const quizz = { ...savedQuizz, thumbnail: null };
    const path = './upload/thumbnails';
    const filePath = `${path}/${savedQuizz.id}.png`;
    await fs.ensureDir(path);
    await fs.writeFile(filePath, image[0].buffer);
    if (fs.existsSync(filePath)) {
      const imageBuffer = fs.readFileSync(filePath);
      quizz.thumbnail = imageBuffer;
    }

    console.log(quizz);
    return quizz;
  }
}
