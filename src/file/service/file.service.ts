import { Injectable } from '@nestjs/common'
import {
  DeleteResult,
  InsertResult,
  Repository,
  Stream,
  UpdateResult
} from 'typeorm'
import { FileEntity } from '../file.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { returnCur } from '../../utils/tools';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>
  ) {}

  query(): Promise<FileEntity[]> {
    return this.fileRepository.find()
  }

  async add(data: { path: string }): Promise<FileEntity> {
    const res = await this.fileRepository.insert({
      path: data.path
    })
    return returnCur<FileEntity>(res, this.fileRepository)
  }

  del(id): Promise<DeleteResult> {
    return this.fileRepository.delete({
      id
    })
  }
}
