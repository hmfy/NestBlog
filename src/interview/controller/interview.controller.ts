import { Controller, Post, Request } from '@nestjs/common'
import { InterviewService } from '../service/interview.service'
import { wrapperService } from '../../utils/tools'

@Controller('interview')
export class InterviewController {
  constructor(private interviewService: InterviewService) {}
  @Post('add')
  add(@Request() req) {
    return wrapperService(() => this.interviewService.add(req))
  }
  @Post('count')
  count() {
    return wrapperService(() => this.interviewService.count())
  }
  @Post('query')
  query() {
    return wrapperService(() => this.interviewService.query())
  }
}
