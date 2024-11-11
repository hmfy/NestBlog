import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TagEntity } from '../tag.entity'
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>
  ) {}
  getTag(): Promise<TagEntity[]> {
    return this.tagRepository.find()
  }
  addTag(data): Promise<InsertResult> {
    return this.tagRepository
      .createQueryBuilder()
      .insert()
      .into(TagEntity)
      .values([
        {
          name: data.name
        }
      ])
      .execute()
  }
  deleteTag(id): Promise<DeleteResult> {
    return this.tagRepository.delete({
      id
    })
  }
  editTag(data): Promise<UpdateResult> {
    return this.tagRepository.update(
      {
        id: data.id
      },
      data
    )
  }
}
