import { AnswersService } from '../answers/answers.service'
import { SentencesService } from '../sentences/sentences.service'
import { StoriesService } from '../stories/stories.service'
import { TUserId } from '../t-users/entities/t-user.entity'
import { TUsersService } from '../t-users/t-users.service'
import {
  convertToReplyId,
  convertToSentenceId,
  convertToTUserId,
} from '../utils/type-convertors'
import { TelegramService } from './telegram.service'
import { Action, Ctx, On, Start, Update } from 'nestjs-telegraf'
import { Context, Markup } from 'telegraf'

@Update()
export class TelegramUpdate {
  constructor(
    private tUserService: TUsersService,
    private storiesService: StoriesService,
    private answersService: AnswersService,
    private telegramService: TelegramService,
    private sentencesService: SentencesService,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    const { username, id: telegramId } = ctx.from

    let tUser = await this.tUserService.find(username, telegramId)

    if (!tUser) {
      // TODO: Send some instruction to the user mb?
      tUser = await this.tUserService.create({ username, telegramId })
    }

    await this.sendNextSentence(ctx, tUser.id)
  }

  private async sendNextSentence(ctx: Context, tUserId: TUserId) {
    const currentStory = await this.storiesService.getStoryForUser(tUserId)

    // TODO: get current chapters the correct way, with handeling of empty sentences
    const firstSentence = currentStory.chapters[0].sentences[0]

    const keyboardProps = this.telegramService.makeKeyboardProps(
      firstSentence.replies,
      tUserId,
      firstSentence.id,
    )

    // this.telegramService.saveKeyboardProps(firstSentence.id, keyboardProps)

    const keyboard = keyboardProps.map(({ text, data }) =>
      Markup.button.callback(text, data),
    )

    await ctx.reply(firstSentence.text, Markup.inlineKeyboard(keyboard))
  }

  // TODO: handle the open reply here
  @On('message')
  async on(@Ctx() ctx: Context) {
    const { username, id: telegramId } = ctx.from

    let tUser = await this.tUserService.find(username, telegramId)

    if (!tUser) {
      // TODO: Send some instruction to the user mb?
      tUser = await this.tUserService.create({ username, telegramId })
    }

    await this.sendNextSentence(ctx, tUser.id)
  }

  @Action(/action (.+)/)
  async action(@Ctx() ctx: Context & { match: string[] }) {
    const actionData = ctx.match[1]
    const [rawReplyId, rawTUserId, sentenceId] = actionData.split('-')

    const replyId = convertToReplyId(rawReplyId)
    const tUserId = convertToTUserId(rawTUserId)

    const previousSentence = await this.sentencesService.findOneWithReplies(
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

    const keyboardProps = this.telegramService.makeModifiedKeyboardProps(
      previousSentence.replies,
      tUserId,
      previousSentence.id,
      replyId,
    )

    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        keyboardProps.map(({ text, data }) =>
          Markup.button.callback(text, data),
        ),
      ],
    })

    if (currentReply?.isCorrect) {
      await ctx.reply('Correct answer!')
      await this.sendNextSentence(ctx, tUserId)

      return
    }

    if (currentReply) {
      const currentHint = currentReply.hint ?? 'Wrong answer'

      await ctx.replyWithMarkdownV2(`*${currentHint}*`.replace('.', '\\.'))
      await ctx.reply('Try again')
    }
  }
}
