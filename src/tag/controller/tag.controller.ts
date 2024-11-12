import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { TagService } from '../service/tag.service'
import { CustomRes } from '../../utils/interface'
import { wrapperService } from '../../utils/tools'
import { ApiOperation } from '@nestjs/swagger'

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('get')
  async getTag(): Promise<CustomRes> {
    return wrapperService(() => this.tagService.getTag())
  }

  @Post('add')
  async addTag(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.tagService.addTag(data), {
      data,
      keyList: ['name']
    })
  }

  @Post('delete')
  async delTag(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.tagService.deleteTag(data.id), {
      data,
      keyList: ['id']
    })
  }

  @Post('edit')
  async editTag(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.tagService.editTag(data), {
      data,
      keyList: ['id']
    })
  }
  @ApiOperation({ summary: '获取所有标签总数' })
  @Get('count')
  async count(): Promise<CustomRes> {
    return wrapperService(() => this.tagService.allCount())
  }
}
