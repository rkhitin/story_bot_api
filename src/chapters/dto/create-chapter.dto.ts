import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateChapterDto {
  @IsString()
  title: string

  @IsNotEmpty()
  @IsNumber()
  storyId: number

  description?: string
}
