import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {FileService} from "../service/file.service";
import {CustomRes} from "../../utils/interface";
import {wrapperService} from "../../utils/tools";

@Controller('file')
export class FileController {
    constructor(
        private fileService:FileService
    ) {
    }

    @Get('query')
    async query (@Request() params):Promise<CustomRes> {
        return wrapperService(() => this.fileService.query(params))
    }

    @Post('add')
    async add (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.fileService.add(data))
    }

    @Post('del')
    async del (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.fileService.del(data.id), {
            data,
            keyList: ['id']
        })
    }

    @Post('edit')
    async edit (@Body() data):Promise<CustomRes> {
        return wrapperService(() => this.fileService.edit(data.id), {
            data,
            keyList: ['id']
        })
    }
}
