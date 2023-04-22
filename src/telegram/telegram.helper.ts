import { Reply, ReplyId } from '../replies/entities/reply.entity'
import { SentenceId } from '../sentences/entities/sentence.entity'
import { TUserId } from '../t-users/entities/t-user.entity'
import { ButtonData, KeyboardProps, MakeButtonDataDto } from './telegram.types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TelegramHelper {
  private makeButtonData({
    replyId,
    tUserId,
    sentenceId,
  }: MakeButtonDataDto): ButtonData {
    return `action ${replyId}-${tUserId}-${sentenceId}`
  }

  public makeKeyboardProps(
    replies: Reply[],
    tUserId: TUserId,
    sentenceId: number,
  ): KeyboardProps {
    return replies.map((reply) => ({
      text: reply.text + ` (${reply.isCorrect ? '+' : '-'})`,
      data: this.makeButtonData({ replyId: reply.id, tUserId, sentenceId }),
    }))
  }

  public makeModifiedKeyboardProps(
    replies: Reply[],
    tUserId: TUserId,
    sentenceId: SentenceId,
    userReplyId: ReplyId,
  ): KeyboardProps {
    return replies.map((reply) => {
      let text = reply.text + ` (${reply.isCorrect ? '+' : '-'})`

      if (userReplyId === reply.id) {
        text = (reply.isCorrect ? ' ✅' : ' ❌') + text
      }

      return {
        text,
        data: this.makeButtonData({ replyId: reply.id, tUserId, sentenceId }),
      }
    })
  }
}
