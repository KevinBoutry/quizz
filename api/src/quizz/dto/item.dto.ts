import { IsNotEmpty } from "class-validator";

export class CreateItemDto {

    @IsNotEmpty()
    itemid: number

    @IsNotEmpty()
    itemname: string;

    category: string;

    
}