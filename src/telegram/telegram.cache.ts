import { Sentence } from '../sentences/entities/sentence.entity'
import { SentenceId } from '../sentences/entities/sentence.entity'
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
}
