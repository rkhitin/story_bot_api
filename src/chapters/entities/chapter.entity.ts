import { Sentence } from '../../sentences/entities/sentence.entity'
import { Story } from '../../stories/entities/story.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

export type ChapterId = number & { __type: 'ChapterId' }

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: ChapterId

  @Column()
  ordinalNumber: number

  @Column({ default: true })
  isActive: boolean

  @Column()
  title: string

  @Column({ default: '' })
  description: string

  @ManyToOne(() => Story, (story) => story.chapters, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  story: Story

  @OneToMany(() => Sentence, (sentence) => sentence.chapter)
  sentences: Sentence[]
}
