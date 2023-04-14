import { Sentence } from './sentence.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Replay {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: true })
  isActive: boolean

  @Column()
  text: string

  @Column()
  hint: string

  @ManyToOne(() => Sentence, (sentence) => sentence.replays)
  sentence: Sentence
}
