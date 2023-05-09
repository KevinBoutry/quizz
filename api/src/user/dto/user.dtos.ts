import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { REGEX } from 'src/app.utils';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(5, 25)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(REGEX.PASSWORD_RULE)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  userid: number;

  createdAt: Date;

  isAdmin: boolean;
}
