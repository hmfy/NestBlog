import { Controller, Post, Request } from '@nestjs/common'
import { InterviewService } from '../service/interview.service'
import { wrapperService } from '../../utils/tools'
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('访问记录')
@Controller('interview')
export class InterviewController {
  constructor(private interviewService: InterviewService) {}

  @ApiOperation({ summary: '新增访问记录, 调用增加一条记录' })
  @Post('add')
  add(@Request() req) {
    return wrapperService(() => this.interviewService.add(req))
  }
  @ApiOperation({ summary: '获取系统访问总次数' })
  @Post('count')
  count() {
    return wrapperService(() => this.interviewService.count())
  }
  @ApiOperation({ summary: '获取系统访问列表' })
  @Post('query')
  query() {
    return wrapperService(() => this.interviewService.query())
  }
}
