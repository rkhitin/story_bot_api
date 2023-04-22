import { Reply, ReplyId } from '../replies/entities/reply.entity'
import { TUserId } from '../t-users/entities/t-user.entity'
import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'

type ButtonData = `action ${number}-${TUserId}-${number}`

type ButtonProps = { text: string; data: ButtonData }

type KeyboardProps = ButtonProps[]

type MakeButtonDataDto = {
  replyId: number
  tUserId: TUserId
  sentenceId: number
}

@Injectable()
export class TelegramService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

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
    sentenceId: number,
    userReplyId: ReplyId,
  ): KeyboardProps {
    return replies.map((reply) => {
      let text = reply.text + ` (${reply.isCorrect ? '+' : '-'})`

      if (String(userReplyId) === String(reply.id)) {
        text = (reply.isCorrect ? ' ✅' : ' ❌') + text
      }

      return {
        text,
        data: this.makeButtonData({ replyId: reply.id, tUserId, sentenceId }),
      }
    })
  }

  public saveKeyboardProps(sentenceId: number, keyboardProps: KeyboardProps) {
    this.redis.set(
      `keyboard_props_${sentenceId}`,
      JSON.stringify(keyboardProps),
    )
  }

  public async getKeyboardProps(
    sentenceId: number,
  ): Promise<KeyboardProps | null> {
    const keyboardPropsJSON = await this.redis.get(
      `keyboard_props_${sentenceId}`,
    )

    try {
      return JSON.parse(keyboardPropsJSON)
    } catch (_error) {
      return null
    }
  }
}
