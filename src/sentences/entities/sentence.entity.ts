import { Chapter } from '../../chapters/entities/chapter.entity'
import { Reply } from '../../replies/entities/reply.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

export type SentenceId = number & { __type: 'SentenceId' }

@Unique(['chapter', 'ordinalNumber'])
@Entity('sentence', {
  orderBy: {
    ordinalNumber: 'ASC',
  },
})
export class Sentence {
  @PrimaryGeneratedColumn()
  id: SentenceId

  @Column()
  ordinalNumber: number

  @Column({ default: true })
  isActive: boolean

  @Column()
  text: string

  @Column()
  delayBeforeSending: number

  @ManyToOne(() => Chapter, (chapter) => chapter.sentences, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  chapter: Chapter

  @OneToMany(() => Reply, (reply) => reply.sentence)
  replies: Reply[]
}
