import { Reply } from '../replies/entities/reply.entity'
import { Sentence } from '../sentences/entities/sentence.entity'
import { SentenceId } from '../sentences/entities/sentence.entity'
import { TUserId } from '../t-users/entities/t-user.entity'
import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class TelegramCache {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  private getSentenceKey(sentenceId: SentenceId) {
    return `sentence:${sentenceId}`
  }

  public saveSentence(sentence: Sentence) {
    this.redis.set(this.getSentenceKey(sentence.id), JSON.stringify(sentence))
  }

  public async getSentence(sentenceId: SentenceId) {
    const sentenceFromCache = await this.redis.get(
      this.getSentenceKey(sentenceId),
    )

    return sentenceFromCache ? JSON.parse(sentenceFromCache) : null
  }

  public saveOpenReply(reply: Reply, tUserId: TUserId) {
    this.redis.set(`open_reply_${tUserId}`, JSON.stringify(reply))
  }

  public async getOpenReply(tUserId: TUserId) {
    const replyFromCache = await this.redis.get(`open_reply_${tUserId}`)

    return replyFromCache ? JSON.parse(replyFromCache) : null
  }

  public async deleteOpenReply(tUserId: TUserId) {
    await this.redis.del(`open_reply_${tUserId}`)
  }

  public setUserWaitingForResponse(tUserId: TUserId) {
    this.redis.set(`user_waiting_for_response_${tUserId}`, 1)
  }

  public async checkIsUserWaitingForResponse(tUserId: TUserId) {
    return !!(await this.redis.get(`user_waiting_for_response_${tUserId}`))
  }

  public deleteUserWaitingForResponse(tUserId: TUserId) {
    this.redis.del(`user_waiting_for_response_${tUserId}`)
  }
}
