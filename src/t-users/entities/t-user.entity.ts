import { Answer } from '../../answers/entities/answer.entity'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

export type TUserId = number & { __type: 'TUserId' }

@Unique(['telegramId', 'username'])
@Entity()
export class TUser {
  @PrimaryGeneratedColumn()
  id: TUserId

  @Column()
  telegramId: number

  @Column()
  username: string

  @OneToMany(() => Answer, (answer) => answer.tUser)
  answers: Answer[]
}
