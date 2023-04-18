import { AnswersService } from '../answers/answers.service'
import { StoriesService } from '../stories/stories.service'
import { TUserId } from '../t-users/entities/t-user.entity'
import { TUsersService } from '../t-users/t-users.service'
import { Action, Ctx, Help, On, Start, Update } from 'nestjs-telegraf'
import { Context, Markup } from 'telegraf'

@Update()
export class TelegramUpdate {
  constructor(
    private tUserService: TUsersService,
    private storiesService: StoriesService,
    private answersService: AnswersService,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    const { username, id: telegramId } = ctx.from

    await ctx.reply('ok')
  }
  // @Help()
  // async help(@Ctx() ctx: Context) {
  //   await ctx.reply('Send me a sticker')
  // }

  private async sendNextSentence(ctx: Context, tUserId: TUserId) {
    const currentStory = await this.storiesService.getSentences(tUserId)

    // TODO: get current chapters the correct way, with handeling of empty sentences
    const firstSentence = currentStory.chapters[0].sentences[0]

    const keyboard = firstSentence.replays.map((replay) =>
      Markup.button.callback(replay.text, `action ${replay.id}-${tUserId}`),
    )

    await ctx.reply(firstSentence.text, Markup.inlineKeyboard(keyboard))
  }

  @On('message')
  async on(@Ctx() ctx: Context) {
    const { username, id: telegramId } = ctx.from

    let tUser = await this.tUserService.findByUsername(username)

    if (!tUser) {
      // Send some instruction to the user mb?
      tUser = await this.tUserService.create({ username, telegramId })
    }

    await this.sendNextSentence(ctx, tUser.id)
  }

  @Action(/action (.+)/)
  async action(@Ctx() ctx: Context & { match: string[] }) {
    const actionData = ctx.match[1]
    const [replayId, tUserId] = actionData.split('-')

    const answer = await this.answersService.create({
      replayId: Number(replayId),
      tUserId: Number(tUserId),
    })

    console.log(answer)

    // await ctx.answerCbQuery('OK')
    // await ctx.editMessageReplyMarkup({
    //   inline_keyboard: [
    //     [
    //       Markup.button.callback('Wrong Answer', 'send 23'),
    //       Markup.button.callback('Correct Answer ✅', 'send 23'),
    //     ],
    //   ],
    // })
    // TODO: modify the old one keyboard ^
    await ctx.reply('Answer was recorded')
    await this.sendNextSentence(ctx, tUserId as unknown as TUserId)
  }
}
