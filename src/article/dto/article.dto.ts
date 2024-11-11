import { ApiProperty } from '@nestjs/swagger';

export class GetArticleDto {
  @ApiProperty({
    type: String,
    required: false
  })
  id: string;
}

export class DelArticleDto {
  @ApiProperty()
  id: string;
}

export class UpdateArticleDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    required: false
  })
  content: string;

  @ApiProperty({
    required: false
  })
  title: string;

  @ApiProperty()
  tag: string;
}
