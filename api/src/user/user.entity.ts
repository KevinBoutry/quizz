import { Quizz } from 'src/quizz/quizz.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(()=> Quizz, (quizz) => quizz.user)
  quizzes: Quizz[]

}
