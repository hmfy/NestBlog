import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { DemoService } from '../service/demo.service'
import { CustomRes } from '../../utils/interface'
import { wrapperService } from '../../utils/tools'
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('留言')
@Controller('demo')
export class DemoController {
  constructor(private demoService: DemoService) {}

  @ApiOperation({ summary: '获取作品列表' })
  @Post('query')
  async query(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.demoService.query(data))
  }

  @ApiOperation({ summary: '新增' })
  @Post('add')
  async add(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.demoService.add(data), {
      data,
      keyList: ['desc', 'bg', 'title']
    })
  }

  @ApiOperation({ summary: '删除' })
  @Post('del')
  async del(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.demoService.del(data.id), {
      data,
      keyList: ['id']
    })
  }

  @ApiOperation({ summary: '修改' })
  @Post('edit')
  async edit(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.demoService.edit(data.id), {
      data,
      keyList: ['id', 'desc', 'bg', 'title']
    })
  }
}
