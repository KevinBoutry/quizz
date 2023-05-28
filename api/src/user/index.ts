import { User } from './user.entity';
import { Quizz } from "../quizz/quizz.entity";
import { Item } from '../quizz/item.entity';

const entities = [User, Quizz, Item];

export { User, Quizz, Item };
export default entities;
