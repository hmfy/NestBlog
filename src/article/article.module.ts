import { Module } from '@nestjs/common';
import { ArticleService } from './service/article.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticleEntity} from "./article.entity";
import { ArticleController } from './controller/article.controller';

@Module({
  imports: [
      TypeOrmModule.forFeature([ArticleEntity])
  ],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
