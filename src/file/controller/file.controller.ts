import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
  Query
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
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger'
import * as path from 'path'
import { FileAddDto, FileDelDto, FileUploadDto } from '../dto/file.dto'

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @ApiOperation({ summary: '查询文件列表' })
  @Post('query')
  async query(): Promise<CustomRes> {
    return wrapperService(() => this.fileService.query())
  }

  @ApiOperation({ summary: '文件入库' })
  @Post('add')
  async add(@Body() data: FileAddDto): Promise<CustomRes> {
    return wrapperService(() => this.fileService.add(data))
  }

  @ApiOperation({ summary: '删除文件' })
  @Post('del')
  async del(@Body() data: FileDelDto): Promise<CustomRes> {
    return wrapperService(() => this.fileService.del(data.id), {
      data,
      keyList: ['id']
    })
  }

  @ApiOperation({ summary: '上传' })
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new FileSizeValidationPipe(100 * 1024))
    file: Express.Multer.File & FileUploadDto
  ): Promise<CustomRes> {
    if (!file) {
      return {
        code: -1,
        data: '文件格式有误'
      }
    }

    // 创建文件夹
    const sysTime = getSysTime()
    const folder = `${filePath}/${sysTime}`
    const res = fs.existsSync(folder)
    if (!res) fs.mkdirSync(folder, { recursive: true })

    // 写入文件
    const fileName = `${v4()}-${file.originalname}`
    const fullPath = `${folder}/${fileName}`
    try {
      fs.writeFileSync(fullPath, file.buffer)
    } catch (error) {
      return {
        code: -1,
        data: error
      }
    }

    return this.add({
      path: `${sysTime}/${fileName}`
    })
  }

  @ApiOperation({ summary: '下载' })
  @ApiQuery({ name: 'fileName' })
  @Get('download')
  async download(@Query('fileName') file, @Res() res) {
    if (!file) return res.send('缺少参数 file')
    const fullPath = path.resolve(filePath, file)
    res.download(fullPath, (err) => {
      if (err) res.send(`not found file：${file}`)
    })
  }
}
