import { ArticleDelDto } from '../../article/dto/article.dto'
import { ApiProperty } from '@nestjs/swagger'

export class FileDelDto extends ArticleDelDto {}
export class FileUploadDto {
  @ApiProperty()
  file: Express.Multer.File
}
export class FileAddDto {
  @ApiProperty()
  path: string
}
