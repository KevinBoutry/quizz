import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Quizz {

    @PrimaryGeneratedColumn()
    quizzid: number;

    @Column({unique: true})
    quizzname: string;

    @Column({nullable: true})
    description: string;

    @Column()
    timer: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    theme: string;

    @Column({nullable: true})
    thumbnail: string;

    @Column({default: 0})
    timeplayed: number;
    
    @Column({default: 0})
    upvote: number;
    
    @Column({default: 0})
    downvote: number;

    @ManyToOne(() => User, (user) => user.quizzes)
    user: User

    @OneToMany(() => Item, (item) => item.quizz)
    items: Item[]
}