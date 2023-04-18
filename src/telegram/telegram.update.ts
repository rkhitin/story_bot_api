import { AnswersService } from '../answers/answers.service'
import { StoriesService } from '../stories/stories.service'
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

  @On('message')
  async on(@Ctx() ctx: Context) {
    const { username, id: telegramId } = ctx.from

    let tUser = await this.tUserService.findByUsername(username)

    if (!tUser) {
      // Send some instruction to the user mb?
      tUser = await this.tUserService.create({ username, telegramId })
    }

    const currentStory = await this.storiesService.getSentences(tUser.id)

    const firstSentence = currentStory.chapters[0].sentences[0]

    const keyboard = firstSentence.replays.map((replay) =>
      Markup.button.callback(replay.text, `action ${replay.id}-${tUser.id}`),
    )

    await ctx.reply(firstSentence.text, Markup.inlineKeyboard(keyboard))
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
    await ctx.reply('Ok')
  }
}
