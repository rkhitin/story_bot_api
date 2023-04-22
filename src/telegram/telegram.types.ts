import { TUserId } from '../t-users/entities/t-user.entity'

export type ButtonData = `action ${number}-${TUserId}-${number}`

export type ButtonProps = { text: string; data: ButtonData }

export type KeyboardProps = ButtonProps[]

export type MakeButtonDataDto = {
  replyId: number
  tUserId: TUserId
  sentenceId: number
}
