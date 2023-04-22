import { ChapterId } from '../../chapters/entities/chapter.entity'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateSentenceDto {
  @IsString()
  text: string

  @IsNotEmpty()
  @IsNumber()
  chapterId: ChapterId

  @IsNotEmpty()
  @IsNumber()
  delayBeforeSending: number
}
