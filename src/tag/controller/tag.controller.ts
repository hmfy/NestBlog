import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { TagService } from '../service/tag.service'
import { CustomRes } from '../../utils/interface'
import { wrapperService } from '../../utils/tools'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddTagDto, DelTagDto, EditTagDto } from '../dto/tag.dto'

@ApiTags('标签')
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @ApiOperation({ summary: '获取所有标签' })
  @Post('query')
  async getTag(): Promise<CustomRes> {
    return wrapperService(() => this.tagService.getTag())
  }

  @ApiOperation({ summary: '添加标签' })
  @Post('add')
  async addTag(@Body() data: AddTagDto): Promise<CustomRes> {
    return wrapperService(() => this.tagService.addTag(data), {
      data,
      keyList: ['name']
    })
  }

  @ApiOperation({ summary: '删除标签' })
  @Post('delete')
  async delTag(@Body() data: DelTagDto): Promise<CustomRes> {
    return wrapperService(() => this.tagService.deleteTag(data.id), {
      data,
      keyList: ['id']
    })
  }

  @ApiOperation({ summary: '修改标签' })
  @Post('edit')
  async editTag(@Body() data: EditTagDto): Promise<CustomRes> {
    return wrapperService(() => this.tagService.editTag(data), {
      data,
      keyList: ['id', 'name']
    })
  }
  @ApiOperation({ summary: '获取所有标签总数' })
  @Post('count')
  async count(): Promise<CustomRes> {
    return wrapperService(() => this.tagService.allCount())
  }
}
