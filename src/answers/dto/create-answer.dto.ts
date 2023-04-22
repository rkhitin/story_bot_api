import { ReplyId } from '../../replies/entities/reply.entity'
import { TUserId } from '../../t-users/entities/t-user.entity'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  tUserId: TUserId

  @IsNotEmpty()
  @IsNumber()
  replyId: ReplyId
}
