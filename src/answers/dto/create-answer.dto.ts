import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateAnswerDto {
  @IsString()
  title: string

  @IsNotEmpty()
  @IsNumber()
  tUserId: number

  @IsNotEmpty()
  @IsNumber()
  replayId: number
}
