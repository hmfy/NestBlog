import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { LinkService } from '../service/link.service'
import { CustomRes } from '../../utils/interface'
import { wrapperService } from '../../utils/tools'
import { ApiOperation } from '@nestjs/swagger'
import { LinkAddDto, LinkDeleteDto, LinkUpdateDto } from '../dto/link.dto';

@Controller('link')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @ApiOperation({ summary: '获取所有友链' })
  @Post('query')
  async query(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.linkService.query(data))
  }

  @ApiOperation({ summary: '新增' })
  @Post('add')
  async add(@Body() data: LinkAddDto): Promise<CustomRes> {
    return wrapperService(() => this.linkService.add(data), {
      data,
      keyList: ['bg', 'desc']
    })
  }

  @ApiOperation({ summary: '删除' })
  @Post('del')
  async del(@Body() data: LinkDeleteDto): Promise<CustomRes> {
    return wrapperService(() => this.linkService.del(data.id), {
      data,
      keyList: ['id']
    })
  }

  @ApiOperation({ summary: '修改' })
  @Post('edit')
  async edit(@Body() data: LinkUpdateDto): Promise<CustomRes> {
    return wrapperService(() => this.linkService.edit(data.id), {
      data,
      keyList: ['bg', 'desc', 'id']
    })
  }
}
