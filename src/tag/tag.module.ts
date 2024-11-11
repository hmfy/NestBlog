import { Module } from '@nestjs/common';
import { TagService } from './service/tag.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TagEntity} from "./tag.entity";
import { TagController } from './controller/tag.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagEntity])
  ],
  providers: [TagService],
  controllers: [TagController]
})
export class TagModule {}
