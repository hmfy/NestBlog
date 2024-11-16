import { ApiProperty } from '@nestjs/swagger'
import { ArticleDelDto } from '../../article/dto/article.dto';

export class LinkAddDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  bg: string

  @ApiProperty()
  desc: string
}

export class LinkDeleteDto extends ArticleDelDto {}
export class LinkUpdateDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  bg: string

  @ApiProperty()
  desc: string
}
