import { Replay } from '../../replays/entities/replay.entity'
import { TUser } from '../../t-users/entities/t-user.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => TUser, (tUser) => tUser.answers, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  tUser: TUser

  @ManyToOne(() => Replay, (replay) => replay.answers, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  replay: Replay
}
