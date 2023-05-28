import { IsNotEmpty,  MinLength } from "class-validator";

export class CreateQuizzDto {
    @IsNotEmpty()
    @MinLength(8)
    quizzname: string;

    @IsNotEmpty()
    timer: number;

    @IsNotEmpty()
    theme: string;

    quizzid: number;
    
    description: string;
    
    thumbnail: string;
    
    createdAt: Date;

}