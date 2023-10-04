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

  getThumbnail(id) {
    const path = './upload/thumbnails';
    if (fs.existsSync(path)) {
      return fs.readFileSync(`${path}/${id}.png`);
    }
  }

  async getByTheme(theme) {
    const quizzes = await this.QuizzRepository.find({
      where: {
        theme,
      },
    });
    const result = quizzes.map((current) => {
      return { ...current, thumbnail: this.getThumbnail(current.id) };
    });
    console.log('quizz', quizzes);
    console.log('result', result);
    return result;
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
    const maxScore = tempQuizz.items.length;
    const quizz = {
      ...tempQuizz,
      categories: [],
      maxScore,
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
    const quizz = { ...savedQuizz, thumbnail: null };
    const path = './upload/thumbnails';
    const filePath = `${path}/${savedQuizz.id}.png`;
    await fs.ensureDir(path);
    await fs.writeFile(filePath, image[0].buffer);
    if (fs.existsSync(filePath)) {
      const imageBuffer = fs.readFileSync(filePath);
      quizz.thumbnail = imageBuffer;
    }
    return quizz;
  }
}
