import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { TalkService } from '../service/talk.service'
import { CustomRes } from '../../utils/interface'
import { wrapperService } from '../../utils/tools'
import { ApiOperation } from '@nestjs/swagger'
import { TalkAddDto, TalkDelDto, TalkQueryDto } from '../dto/talk.dto'

@Controller('talk')
export class TalkController {
  constructor(private talkService: TalkService) {}

  @ApiOperation({ summary: '获取留言' })
  @Post('query')
  async query(@Body() data: TalkQueryDto): Promise<CustomRes> {
    return wrapperService(() => this.talkService.query(data), {
      data,
      keyList: ['index', 'size']
    })
  }

  @ApiOperation({ summary: '新增' })
  @Post('add')
  async add(@Body() data: TalkAddDto): Promise<CustomRes> {
    return wrapperService(() => this.talkService.add(data), {
      data,
      keyList: ['nickname', 'content']
    })
  }

  @ApiOperation({ summary: '删除' })
  @Post('del')
  async del(@Body() data: TalkDelDto): Promise<CustomRes> {
    return wrapperService(() => this.talkService.del(data.id), {
      data,
      keyList: ['id']
    })
  }

  /*@ApiOperation({ summary: '修改' })
  @Post('edit')
  async edit(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.talkService.edit(data.id), {
      data,
      keyList: ['id']
    })
  }*/
}
