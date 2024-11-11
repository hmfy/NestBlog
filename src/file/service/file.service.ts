import { Injectable } from '@nestjs/common';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { FileEntity } from '../file.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  query(req): Promise<FileEntity[]> {
    return this.fileRepository.find();
  }

  add(data): Promise<InsertResult> {
    return this.fileRepository.insert({
      type: data.type,
      path: data.type,
      pid: data.pid,
    });
  }

  del(id): Promise<DeleteResult> {
    return this.fileRepository.delete({
      id,
    });
  }

  edit(body): Promise<UpdateResult> {
    return this.fileRepository.update(
      {
        id: body.id,
      },
      body,
    );
  }
}
