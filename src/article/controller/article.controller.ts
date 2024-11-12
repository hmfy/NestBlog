import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ArticleService } from '../service/article.service'

import { CustomRes } from '../../utils/interface'
import { wrapperService } from '../../utils/tools'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  DelArticleDto,
  GetArticleDto,
  UpdateArticleDto
} from '../dto/article.dto'

@ApiTags('列表')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOperation({ summary: '获取文章' })
  @Post('query')
  async getArticle(@Body() data: GetArticleDto): Promise<CustomRes> {
    return wrapperService(() => this.articleService.query(data), {
      data: data,
      keyList: ['index', 'size']
    })
  }

  @ApiOperation({ summary: '新增文章' })
  @Post('add')
  async addArticle(@Body() data: UpdateArticleDto): Promise<CustomRes> {
    return wrapperService(() => this.articleService.addArticle(data), {
      data,
      keyList: ['tag']
    })
  }

  @ApiOperation({ summary: '根据 Article ID 删除文章' })
  @Post('delete')
  async deleteArticle(@Body() data: DelArticleDto): Promise<CustomRes> {
    return wrapperService(() => this.articleService.delArticle(data.id), {
      data,
      keyList: ['id']
    })
  }

  @ApiOperation({ summary: '根据 Article ID 修改文章' })
  @Post('edit')
  async editArticle(@Body() data: UpdateArticleDto): Promise<CustomRes> {
    return wrapperService(() => this.articleService.editArticle(data), {
      data,
      keyList: ['id']
    })
  }
  @ApiOperation({ summary: '获取所有文章总数' })
  @Post('count')
  async count(): Promise<CustomRes> {
    return wrapperService(() => this.articleService.allCount())
  }
}
