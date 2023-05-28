import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quizz } from "./quizz.entity";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    itemid: number;

    @Column()
    itemname: string;

    @Column({nullable: true})
    category: string;

    @ManyToOne(() => Quizz, (quizz) => quizz.items)
    quizz: Quizz
}