import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {TalkService} from "../service/talk.service";
import {CustomRes} from "../../utils/interface";
import {wrapperService} from "../../utils/tools";

@Controller('talk')
export class TalkController {
    constructor(
        private talkService: TalkService
    ) {
    }

    @Get('query')
    async query (@Request() params):Promise<CustomRes> {
        return wrapperService(() => this.talkService.query(params))
    }

    @Post('add')
    async add (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.talkService.add(data))
    }

    @Post('del')
    async del (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.talkService.del(data.id), {
            data,
            keyList: ['id']
        })
    }

    @Post('edit')
    async edit (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.talkService.edit(data.id), {
            data,
            keyList: ['id']
        })
    }
}
