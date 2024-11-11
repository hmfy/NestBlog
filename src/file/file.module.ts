import { Module } from '@nestjs/common';
import { FileService } from './service/file.service';
import { FileController } from './controller/file.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FileEntity} from "./file.entity";

@Module({
  providers: [FileService],
  controllers: [FileController],
  imports: [
      TypeOrmModule.forFeature([FileEntity])
  ]
})
export class FileModule {}
