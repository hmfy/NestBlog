import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArticleService } from '../service/article.service';

import { CustomRes } from '../../utils/interface';
import { wrapperService } from '../../utils/tools';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DelArticleDto,
  GetArticleDto,
  UpdateArticleDto
} from '../dto/article.dto';

@ApiTags('列表')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOperation({ summary: '获取文章' })
  @Get('get')
  async getArticle(@Query() params: GetArticleDto): Promise<CustomRes> {
    return wrapperService(() => this.articleService.getArticle(params));
  }

  @ApiOperation({ summary: '新增文章' })
  @Post('add')
  async addArticle(@Body() data: UpdateArticleDto): Promise<CustomRes> {
    return wrapperService(() => this.articleService.addArticle(data));
  }

  @ApiOperation({ summary: '根据 Article ID 删除文章' })
  @Post('delete')
  async deleteArticle(@Body() data: DelArticleDto): Promise<CustomRes> {
    return wrapperService(() => this.articleService.delArticle(data.id), {
      data,
      keyList: ['id']
    });
  }

  @ApiOperation({ summary: '根据 Article ID 修改文章' })
  @Post('edit')
  async editArticle(@Body() data: UpdateArticleDto): Promise<CustomRes> {
    return wrapperService(() => this.articleService.editArticle(data), {
      data,
      keyList: ['id']
    });
  }
}
