import { Injectable } from '@nestjs/common'
import { InterviewEntity } from '../interview.entity'
import { InsertResult, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { getRealIp } from '../../utils/tools'
import { Request } from 'express'

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(InterviewEntity)
    private interviewRepository: Repository<InterviewEntity>
  ) {}

  add(req: Request): Promise<InsertResult> {
    const ip = getRealIp(req)
    return this.interviewRepository.insert({
      ip: ip
    })
  }
  count(): Promise<number> {
    return this.interviewRepository.count()
  }
  query(): Promise<InterviewEntity[]> {
    return this.interviewRepository.find()
  }
}
