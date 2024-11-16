import { ApiProperty } from '@nestjs/swagger'
import { ArticleDelDto, GetArticleDto } from '../../article/dto/article.dto';

export class TalkQueryDto extends GetArticleDto {}

export class TalkDelDto extends ArticleDelDto {}

export class TalkAddDto {
  @ApiProperty()
  nickname: string

  @ApiProperty()
  content: string
}
