import { Module } from '@nestjs/common';
import { DemoService } from './service/demo.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DemoEntity} from "./demo.entity";
import { DemoController } from './controller/demo.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DemoEntity])
  ],
  providers: [DemoService],
  controllers: [DemoController]
})
export class DemoModule {}
