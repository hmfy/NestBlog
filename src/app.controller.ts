import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation } from '@nestjs/swagger'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '服务启动测试' })
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
