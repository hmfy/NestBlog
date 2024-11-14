import { ApiProperty } from '@nestjs/swagger'

export class DelTagDto {
  @ApiProperty()
  id: string
}

export class AddTagDto {
  @ApiProperty()
  name: string
}

export class EditTagDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string
}
