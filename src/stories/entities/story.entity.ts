import { Chapter } from '../../chapters/entities/chapter.entity'
import { Sentence } from '../../sentences/entities/sentence.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

export type StoryId = number & { __type: 'StoryId' }

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: StoryId

  @Column({ default: true })
  isActive: boolean

  @Column()
  title: string

  @Column({ default: '' })
  description: string

  @OneToMany(() => Chapter, (chapter) => chapter.story)
  chapters: Chapter[]

  sentences?: Sentence[]
}
