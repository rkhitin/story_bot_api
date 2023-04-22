import { AnswersService } from '../answers/answers.service'
import { ReplyId } from '../replies/entities/reply.entity'
import { SentencesService } from '../sentences/sentences.service'
import { StoriesService } from '../stories/stories.service'
import { TUserId } from '../t-users/entities/t-user.entity'
import { TUsersService } from '../t-users/t-users.service'
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
    const [replyId, tUserId, sentenceId] = actionData.split('-')

    const previousSentence = await this.sentencesService.findOneWithReplies(
      this.sentencesService.convertToSentenceId(sentenceId),
    )

    const answer = await this.answersService.create({
      replyId: Number(replyId),
      tUserId: Number(tUserId),
    })

    if (!answer) {
      await ctx.reply('You already answered this question')
      return
    }

    const keyboardProps = this.telegramService.makeModifiedKeyboardProps(
      previousSentence.replies,
      tUserId as unknown as TUserId,
      previousSentence.id,
      replyId as unknown as ReplyId,
    )

    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        keyboardProps.map(({ text, data }) =>
          Markup.button.callback(text, data),
        ),
      ],
    })

    // TODO: modify the old one keyboard ^
    await ctx.reply('Answer was recorded')
    await this.sendNextSentence(ctx, tUserId as unknown as TUserId)
  }
}
