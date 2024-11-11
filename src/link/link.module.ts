import { Module } from '@nestjs/common';
import { LinkService } from './service/link.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LinkEntity} from "./link.entity";
import { LinkController } from './controller/link.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([LinkEntity])
  ],
  providers: [LinkService],
  controllers: [LinkController]
})
export class LinkModule {}
