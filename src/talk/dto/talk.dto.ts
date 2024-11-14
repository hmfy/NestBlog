import { ApiProperty } from '@nestjs/swagger'
import { DelArticleDto, GetArticleDto } from '../../article/dto/article.dto';

export class TalkQueryDto extends GetArticleDto {}

export class TalkDelDto extends DelArticleDto {}

export class TalkAddDto {
  @ApiProperty()
  nickname: string

  @ApiProperty()
  content: string
}
