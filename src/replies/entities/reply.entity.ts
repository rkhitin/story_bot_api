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

  @ManyToOne(() => Sentence, (sentence) => sentence.replies, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  sentence: Sentence

  @OneToMany(() => Answer, (answer) => answer.reply)
  answers: Answer[]
}
