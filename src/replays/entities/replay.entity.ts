import { Answer } from '../../answers/entities/answer.entity'
import { Sentence } from '../../sentences/entities/sentence.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

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

  @ManyToOne(() => Sentence, (sentence) => sentence.replays, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  sentence: Sentence

  @OneToMany(() => Answer, (answer) => answer.replay)
  answers: Answer[]
}
