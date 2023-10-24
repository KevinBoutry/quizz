import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, Like, Raw } from 'typeorm';
import { Quizz } from '../quizz.entity';
import { Item } from '../item.entity';
import { Score } from '../../score/score.entity';
import { CreateQuizzDto } from '../dto/quizz.dto';
import { CreateItemDto } from '../dto/item.dto';
import * as fs from 'fs-extra';
import { GenericFilter } from 'src/pagination/generic-filter';

@Injectable()
export class QuizzService {
  constructor(
    @InjectRepository(Quizz) private QuizzRepository: Repository<Quizz>,
    @InjectRepository(Item) private ItemRepository: Repository<Item>,
  ) {}

  getThumbnail(id) {
    const path = './upload/thumbnails';
    if (fs.existsSync(path)) {
      return fs.readFileSync(`${path}/${id}.png`);
    }
  }

  async getAll(filter: GenericFilter): Promise<Quizz[]> {
    const whereClause = { name: undefined, theme: undefined };
    if (filter.name) {
      whereClause.name = Raw(
        (alias) => `LOWER(${alias}) LIKE '%${filter.name.toLowerCase()}%'`,
      );
    }
    if (filter.theme) {
      whereClause.theme = filter.theme;
    }
    const quizzes = await this.QuizzRepository.find({
      where: whereClause,
      take: filter.pageSize,
      skip: (filter.page - 1) * filter.pageSize,
      order: {
        timeplayed: 'DESC',
      },
    });

    const result = [];

    for (const quizz of quizzes) {
      result.push({
        ...quizz,
        thumbnail: this.getThumbnail(quizz.id),
        rating: await this.getRating(quizz.id),
      });
    }
    return result;
  }

  async getRating(id) {
    const rating = await this.QuizzRepository.createQueryBuilder()
      .select('quizz.id')
      .select('AVG(s.stars)', 'average')
      .from(Quizz, 'quizz')
      .innerJoin('score', 's', 's.quizzId = quizz.id')
      .where(`quizz.id = ${id}`)
      .groupBy('quizz.id')
      .execute();
    if (rating && rating.length > 0) {
      return Math.round(rating[0].average);
    } else return null;
  }

  async getByTheme(theme) {
    const quizzes = await this.QuizzRepository.find({
      where: {
        theme,
      },
    });
    const result = [];
    for (const quizz of quizzes) {
      result.push({
        ...quizz,
        thumbnail: this.getThumbnail(quizz.id),
        rating: await this.getRating(quizz.id),
      });
    }
    return result;
  }

  async getRecent() {
    const quizzes = await this.QuizzRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    const result = [];
    for (const quizz of quizzes) {
      result.push({
        ...quizz,
        thumbnail: this.getThumbnail(quizz.id),
        rating: await this.getRating(quizz.id),
      });
    }
    return result;
  }

  async getTrending() {
    const quizzes = await this.QuizzRepository.find({
      order: {
        timeplayed: 'DESC',
      },
    });
    const result = [];
    for (const quizz of quizzes) {
      result.push({
        ...quizz,
        thumbnail: this.getThumbnail(quizz.id),
        rating: await this.getRating(quizz.id),
      });
    }
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
