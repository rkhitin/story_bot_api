import { Answer } from '../../answers/entities/answer.entity'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

@Unique(['telegramId', 'username'])
@Entity()
export class TUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  telegramId: number

  @Column()
  username: string

  @OneToMany(() => Answer, (answer) => answer.tUser)
  answers: Answer[]
}
