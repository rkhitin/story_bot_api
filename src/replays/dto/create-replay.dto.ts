import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateReplayDto {
  @IsString()
  text: string

  hint?: string

  @IsNotEmpty()
  @IsNumber()
  sentenceId: number
}
