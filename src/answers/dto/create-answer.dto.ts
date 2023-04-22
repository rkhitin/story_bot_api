import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  tUserId: number

  @IsNotEmpty()
  @IsNumber()
  replyId: number
}
