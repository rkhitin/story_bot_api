import { AnswersService } from '../answers/answers.service'
import { SentenceId } from '../sentences/entities/sentence.entity'
import { SentencesService } from '../sentences/sentences.service'
import { StoriesService } from '../stories/stories.service'
import { TUserId } from '../t-users/entities/t-user.entity'
import { TUsersService } from '../t-users/t-users.service'
import { convertToSentenceId } from '../utils/type-convertors'
import { TelegramCache } from './telegram.cache'
import { TelegramHelper } from './telegram.helper'
import { Injectable } from '@nestjs/common'
import { Markup } from 'telegraf'
import { InlineKeyboardMarkup } from 'telegraf/src/core/types/typegram'

@Injectable()
export class TelegramService {
  constructor(
    private readonly helper: TelegramHelper,
    private readonly cache: TelegramCache,
    private readonly tUserService: TUsersService,
    private readonly storiesService: StoriesService,
    private readonly sentencesService: SentencesService,
    private readonly answersService: AnswersService,
  ) {}

  // TODO: save user to cache
  public async getTUser(username: string, telegramId: number) {
    let tUser = await this.tUserService.find(username, telegramId)

    if (!tUser) {
      tUser = await this.tUserService.create({ username, telegramId })
    }

    return tUser
  }

  public async getNextSentenceData(
    tUserId: TUserId,
  ): Promise<[string, Markup.Markup<InlineKeyboardMarkup>]> {
    const currentStory = await this.storiesService.getStoryForUser(tUserId)

    const firstSentence = currentStory?.chapters?.[0]?.sentences?.[0]

    if (!firstSentence) {
      return ['The story has ended!', Markup.inlineKeyboard([])]
    }

    this.cache.saveSentence(firstSentence)

    const openReply = firstSentence.replies.find(
      (reply) => reply.type === 'open',
    )

    if (openReply) {
      this.cache.saveOpenReply(openReply, tUserId)
    }

    const keyboardProps = this.helper.makeKeyboardProps(
      firstSentence.replies,
      tUserId,
      firstSentence.id,
    )

    const keyboard = keyboardProps.map(({ text, data, hide }) =>
      Markup.button.callback(text, data, hide),
    )

    return [firstSentence.text, Markup.inlineKeyboard(keyboard)]
  }

  public async getPreviousSentence(sentenceId: SentenceId) {
    const sentenceFromCache = await this.cache.getSentence(sentenceId)

    if (sentenceFromCache) {
      return sentenceFromCache
    }

    return this.sentencesService.findOneWithReplies(
      convertToSentenceId(sentenceId),
    )
  }

  public async getModifiedKeyboard({ previousSentence, replyId, tUserId }) {
    const keyboardProps = this.helper.makeModifiedKeyboardProps(
      previousSentence.replies,
      tUserId,
      previousSentence.id,
      replyId,
    )

    return keyboardProps.map(({ text, data }) =>
      Markup.button.callback(text, data),
    )
  }

  public async handleMessage(
    tUserId: TUserId,
    message: string,
  ): Promise<[string, Markup.Markup<InlineKeyboardMarkup>]> {
    const openReply = await this.cache.getOpenReply(tUserId)

    if (openReply) {
      console.log(openReply)

      if (openReply.text === message) {
        await this.cache.deleteOpenReply(tUserId)

        await this.answersService.create({
          replyId: openReply.id,
          tUserId,
        })

        return await this.getNextSentenceData(tUserId)
      }

      // TODO: unify hint creation
      const currentHint = openReply.hint ?? 'Wrong answer'

      return [`*${currentHint}*`.replace('.', '\\.'), null]
    }

    return await this.getNextSentenceData(tUserId)
  }
}
