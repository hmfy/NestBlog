import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {LinkService} from "../service/link.service";
import {CustomRes} from "../../utils/interface";
import {wrapperService} from "../../utils/tools";

@Controller('link')
export class LinkController {
    constructor(
        private linkService: LinkService
    ) {
    }

    @Post('query')
    async query (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.linkService.query(data))
    }

    @Post('add')
    async add (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.linkService.add(data))
    }

    @Post('del')
    async del (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.linkService.del(data.id), {
            data,
            keyList: ['id']
        })
    }

    @Post('edit')
    async edit (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.linkService.edit(data.id), {
            data,
            keyList: ['id']
        })
    }
}
