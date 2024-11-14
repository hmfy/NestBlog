import { ApiProperty } from '@nestjs/swagger'
import { DelArticleDto } from '../../article/dto/article.dto';

export class LinkAddDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  bg: string

  @ApiProperty()
  desc: string
}

export class LinkDeleteDto extends DelArticleDto {}
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
