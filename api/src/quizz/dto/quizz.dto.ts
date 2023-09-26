import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateQuizzDto {
  @IsNotEmpty()
  @MinLength(8)
  name: string;

  @IsNotEmpty()
  timer: number;

  @IsNotEmpty()
  theme: string;

  id: number;

  description: string;

  createdAt: Date;

  items: Array<Record<string, any>>;
}
