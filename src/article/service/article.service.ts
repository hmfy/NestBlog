import { Body, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ArticleEntity } from '../article.entity'
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>
  ) {}

  async query(req): Promise<{ total: number; list: ArticleEntity[] }> {
    const [list, total] = await this.articleRepository
      .createQueryBuilder()
      .skip((req.index - 1) * req.size)
      .take(req.size)
      .getManyAndCount()
    return {
      list,
      total
    }
  }

  addArticle(body): Promise<InsertResult> {
    return this.articleRepository.insert({
      title: body.title,
      content: body.content,
      tag: body.tag
    })
  }

  delArticle(id): Promise<DeleteResult> {
    return this.articleRepository.delete({
      id
    })
  }

  editArticle(body): Promise<UpdateResult> {
    return this.articleRepository.update(
      {
        id: body.id
      },
      body
    )
  }

  allCount() {
    return this.articleRepository.count()
  }
}
