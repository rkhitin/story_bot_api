import { AnswersService } from '../answers/answers.service'
import { TUserId } from '../t-users/entities/t-user.entity'
import {
  convertToReplyId,
  convertToSentenceId,
  convertToTUserId,
} from '../utils/type-convertors'
import { TelegramCache } from './telegram.cache'
import { TelegramService } from './telegram.service'
import { Action, Ctx, On, Start, Update } from 'nestjs-telegraf'
import { Context, Markup } from 'telegraf'
import { InlineKeyboardMarkup } from 'telegraf/src/core/types/typegram'

@Update()
export class TelegramUpdate {
  constructor(
    private answersService: AnswersService,
    private telegramService: TelegramService,
    private readonly cache: TelegramCache,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    const { username, id: telegramId } = ctx.from

    const tUser = await this.telegramService.getTUser(username, telegramId)

    if (await this.cache.checkIsUserWaitingForResponse(tUser.id)) {
      return
    }

    const { text, keyboard, delay } =
      await this.telegramService.getNextSentenceData(tUser.id)

    this.replyWithDelay({ ctx, text, keyboard, delay, tUserId: tUser.id })
  }

  @On('message')
  async on(@Ctx() ctx: Context & { message: { text: string } }) {
    const { username, id: telegramId } = ctx.from

    const tUser = await this.telegramService.getTUser(username, telegramId)

    if (await this.cache.checkIsUserWaitingForResponse(tUser.id)) {
      return
    }

    const { text, keyboard, delay } = await this.telegramService.handleMessage(
      tUser.id,
      ctx.message.text,
    )

    this.replyWithDelay({ ctx, text, keyboard, delay, tUserId: tUser.id })
  }

  // TODO: clear in this method later
  @Action(/action (.+)/)
  async action(@Ctx() ctx: Context & { match: string[] }) {
    const actionData = ctx.match[1]
    const [rawReplyId, rawTUserId, sentenceId] = actionData.split('-')

    const replyId = convertToReplyId(rawReplyId)
    const tUserId = convertToTUserId(rawTUserId)

    if (await this.cache.checkIsUserWaitingForResponse(tUserId)) {
      return
    }

    const previousSentence = await this.telegramService.getPreviousSentence(
      convertToSentenceId(sentenceId),
    )

    const answer = await this.answersService.create({
      replyId,
      tUserId,
    })

    // Check if user already answered this sentence successfully
    if (!answer) {
      await ctx.reply('You already tried this answer, choose another one')
      return
    }

    const currentReply = previousSentence.replies.find(
      (reply) => reply.id === replyId,
    )

    const modifiedKeyboard = await this.telegramService.getModifiedKeyboard({
      previousSentence,
      tUserId,
      replyId,
    })

    await ctx.editMessageReplyMarkup({
      inline_keyboard: [modifiedKeyboard],
    })

    if (currentReply?.isCorrect) {
      await ctx.reply('Correct answer!')

      const { text, keyboard } = await this.telegramService.getNextSentenceData(
        tUserId,
      )

      ctx.reply(text, keyboard)

      return
    }

    if (currentReply) {
      // TODO: unify hint creation
      const currentHint = currentReply.hint ?? 'Wrong answer'

      await ctx.replyWithMarkdownV2(`*${currentHint}*`.replace('.', '\\.'))

      ctx.reply('Try again')
    }
  }

  private replyWithDelay({
    ctx,
    text,
    keyboard,
    delay,
    tUserId,
  }: {
    ctx: Context
    text: string
    keyboard: Markup.Markup<InlineKeyboardMarkup>
    delay: number
    tUserId: TUserId
  }) {
    this.cache.setUserWaitingForResponse(tUserId)

    setTimeout(() => {
      this.cache.deleteUserWaitingForResponse(tUserId)
      ctx.reply(text, keyboard)
    }, delay)
  }
}
