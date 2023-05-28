import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizzService } from "./service/quizz.service";
import { Quizz } from "./quizz.entity";
import { QuizzController } from "./controller/quizz.controller";
import { Module } from "@nestjs/common";

@Module({
    exports: [QuizzService],
    imports: [TypeOrmModule.forFeature([Quizz])],
    providers: [QuizzService],
    controllers: [QuizzController],
})
export class QuizzModule {}