import { Sentence } from './sentence.entity'
import { Story } from './story.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  ordinalNumber: number

  @Column({ default: true })
  isActive: boolean

  @Column()
  title: string

  @Column()
  description: string

  @ManyToOne(() => Story, (story) => story.chapters)
  story: Story

  @OneToMany(() => Sentence, (sentence) => sentence.chapter)
  sentences: Sentence[]
}
