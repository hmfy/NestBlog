import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileService } from '../service/file.service'
import { CustomRes } from '../../utils/interface'
import { v4 } from 'uuid'
import {
  FileSizeValidationPipe,
  getSysTime,
  wrapperService
} from '../../utils/tools'
import { FileInterceptor } from '@nestjs/platform-express'
import { filePath } from '../../../setting'
import * as fs from 'fs'
import * as path from 'path'

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('query')
  async query(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.fileService.query(data))
  }

  @Post('add')
  async add(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.fileService.add(data))
  }

  @Post('del')
  async del(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.fileService.del(data.id), {
      data,
      keyList: ['id']
    })
  }

  @Post('edit')
  async edit(@Body() data): Promise<CustomRes> {
    return wrapperService(() => this.fileService.edit(data.id), {
      data,
      keyList: ['id']
    })
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File
  ): CustomRes {
    if (!file) {
      return {
        code: -1,
        data: null
      }
    }

    // 创建文件夹
    const prefixPath = `${filePath}/${getSysTime()}`
    const res = fs.existsSync(prefixPath)
    if (!res) fs.mkdirSync(prefixPath, { recursive: true })

    // 写入文件
    const fullPath = `${prefixPath}/${v4()}-${file.originalname}`
    fs.writeFileSync(fullPath, file.buffer)
    return {
      code: 200,
      data: 'success'
    }
  }
}
