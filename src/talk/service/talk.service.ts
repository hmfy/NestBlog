import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TalkEntity } from '../talk.entity'
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm'

@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(TalkEntity)
    private talkRepository: Repository<TalkEntity>
  ) {}

  async query(req): Promise<{ total: number; list: TalkEntity[] }> {
    const [list, total] = await this.talkRepository
      .createQueryBuilder()
      .skip((req.index - 1) * req.size)
      .take(req.size)
      .getManyAndCount()

    return {
      list,
      total
    }
  }

  add(body): Promise<InsertResult> {
    return this.talkRepository.insert(body)
  }

  del(id): Promise<DeleteResult> {
    return this.talkRepository.delete({
      id
    })
  }

  edit(body): Promise<UpdateResult> {
    return this.talkRepository.update(
      {
        id: body.id
      },
      body
    )
  }
}
