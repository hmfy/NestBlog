import { ApiProperty } from '@nestjs/swagger'

export class GetArticleDto {
  /*@ApiProperty({
    type: String,
    required: false
  })
  id: string*/

  @ApiProperty({
    type: Number
  })
  size: number

  @ApiProperty({
    type: Number
  })
  index: number
}

export class ArticleDelDto {
  @ApiProperty()
  id: string
}

export class UpdateArticleDto {
  @ApiProperty()
  id: string

  @ApiProperty({
    required: false
  })
  content: string

  @ApiProperty({
    required: false
  })
  title: string

  @ApiProperty()
  tag: string
}
