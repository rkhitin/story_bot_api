import { TUsersService } from '../t-users/t-users.service'
import { Action, Ctx, Help, On, Start, Update } from 'nestjs-telegraf'
import { Context, Markup } from 'telegraf'

@Update()
export class TelegramUpdate {
  constructor(private tUserService: TUsersService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    const { username, id: telegramId } = ctx.from

    const user = await this.tUserService.create({ username, telegramId })

    if (user) {
      // Send the first sentence from story
      await ctx.reply('Welcome, chose a story')
      return
    }

    await ctx.replyWithMarkdownV2(
      'Hello *there*, it is a question',
      Markup.inlineKeyboard([
        Markup.button.callback('Wrong Answer', 'send 88'),
        Markup.button.callback('Correct Answer', 'send 23'),
      ])
    )
  }
  @Help()
  async help(@Ctx() ctx: Context) {
    await ctx.reply('Send me a sticker')
  }

  @On('message')
  async on(@Ctx() ctx: Context) {
    console.log(ctx.message)
    await ctx.reply('👍')
  }

  @Action(/send (.+)/)
  async action(@Ctx() ctx: Context) {
    console.log(ctx)

    // await ctx.answerCbQuery('OK')
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        [
          Markup.button.callback('Wrong Answer', 'send 23'),
          Markup.button.callback('Correct Answer ✅', 'send 23'),
        ],
      ],
    })
    // await ctx.reply('Ok')
  }
}
