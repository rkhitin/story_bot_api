import { Chapter } from './chapter.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: true })
  isActive: boolean

  @Column()
  title: string

  @Column()
  description: string

  @OneToMany(() => Chapter, (chapter) => chapter.story)
  chapters: Chapter[]
}
