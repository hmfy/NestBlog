import { Module } from '@nestjs/common';
import { InterviewService } from './service/interview.service';
import { InterviewController } from './controller/interview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewEntity } from './interview.entity';

@Module({
  providers: [InterviewService],
  controllers: [InterviewController],
  imports: [
    TypeOrmModule.forFeature([InterviewEntity])
  ]
})
export class InterviewModule {}
