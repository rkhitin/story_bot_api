import { Chapter } from '../../chapters/entities/chapter.entity'
import { Replay } from '../../replays/entities/replay.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

@Unique(['chapter', 'ordinalNumber'])
@Entity()
export class Sentence {
  @PrimaryGeneratedColumn()
  id: number

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

  @OneToMany(() => Replay, (replay) => replay.sentence)
  replays: Replay[]
}
