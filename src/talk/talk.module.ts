import { Module } from '@nestjs/common';
import { TalkService } from './service/talk.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TalkEntity} from "./talk.entity";
import { TalkController } from './controller/talk.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TalkEntity])
  ],
  providers: [TalkService],
  controllers: [TalkController]
})
export class TalkModule {}
