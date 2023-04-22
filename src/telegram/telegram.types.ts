import { TUserId } from '../t-users/entities/t-user.entity'
import { Markup } from 'telegraf'
import { InlineKeyboardMarkup } from 'telegraf/src/core/types/typegram'

export type ButtonData = `action ${number}-${TUserId}-${number}`

export type ButtonProps = { text: string; data: ButtonData; hide: boolean }

export type KeyboardProps = ButtonProps[]

export type MakeButtonDataDto = {
  replyId: number
  tUserId: TUserId
  sentenceId: number
}

export type TelegramReplyProps = {
  text: string
  keyboard?: Markup.Markup<InlineKeyboardMarkup>
  delay?: number
}
