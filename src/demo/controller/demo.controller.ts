import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {DemoService} from "../service/demo.service";
import {CustomRes} from "../../utils/interface";
import {wrapperService} from "../../utils/tools";

@Controller('demo')
export class DemoController {
    constructor(
        private demoService: DemoService
    ) {}

    @Get('query')
    async query (@Request() params):Promise<CustomRes> {
        return wrapperService(() => this.demoService.query(params))
    }

    @Post('add')
    async add (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.demoService.add(data))
    }

    @Post('del')
    async del (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.demoService.del(data.id), {
            data,
            keyList: ['id']
        })
    }

    @Post('edit')
    async edit (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.demoService.edit(data.id), {
            data,
            keyList: ['id']
        })
    }
}
