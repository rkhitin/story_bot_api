import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateSentenceDto {
  @IsString()
  text: string

  @IsNotEmpty()
  @IsNumber()
  chapterId: number

  @IsNotEmpty()
  @IsNumber()
  delayBeforeSending: number
}
