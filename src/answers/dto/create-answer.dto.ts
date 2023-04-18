import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  tUserId: number

  @IsNotEmpty()
  @IsNumber()
  replayId: number
}
