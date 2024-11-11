import {ApiProperty} from "@nestjs/swagger";

export class AddArticleDto {
    @ApiProperty({
        type: String,
        required: false
    })
    id: string
}
