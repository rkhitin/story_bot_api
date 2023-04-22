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

    const keyboardProps = this.helper.makeKeyboardProps(
      firstSentence.replies,
      tUserId,
      firstSentence.id,
    )

    // this.telegramService.saveKeyboardProps(firstSentence.id, keyboardProps)

    const keyboard = keyboardProps.map(({ text, data }) =>
      Markup.button.callback(text, data),
    )

    return [firstSentence.text, Markup.inlineKeyboard(keyboard)]
  }

  public async getPreviousSentence(sentenceId: SentenceId) {
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
}
