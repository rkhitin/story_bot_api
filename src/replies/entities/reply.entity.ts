import { Answer } from '../../answers/entities/answer.entity'
import { Sentence } from '../../sentences/entities/sentence.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

export type ReplyId = number & { __type: 'ReplyId' }

const REPLY_TYPES = ['open', 'closed'] as const
export type ReplyType = (typeof REPLY_TYPES)[number]

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: ReplyId

  @Column({ default: true })
  isActive: boolean

  @Column()
  text: string

  @Column()
  hint: string

  @Column({
    type: 'enum',
    enum: REPLY_TYPES,
    default: 'closed',
    enumName: 'typeEnum',
  })
  type: ReplyType

  @Column({ default: false })
  isCorrect: boolean

  @ManyToOne(() => Sentence, (sentence) => sentence.replies, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  sentence: Sentence

  @OneToMany(() => Answer, (answer) => answer.reply)
  answers: Answer[]
}
