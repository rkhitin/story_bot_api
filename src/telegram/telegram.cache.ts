import { KeyboardProps } from './telegram.types'
import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class TelegramCache {
  constructor(@InjectRedis() private readonly redis: Redis) {}

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
