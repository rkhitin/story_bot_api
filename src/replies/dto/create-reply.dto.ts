import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateReplyDto {
  @IsString()
  text: string

  hint?: string

  @IsNotEmpty()
  @IsNumber()
  sentenceId: number
}
