import { Reply } from '../../replies/entities/reply.entity'
import { TUser } from '../../t-users/entities/t-user.entity'
import { Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

export type AnswerId = number & { __type: 'AnswerId' }

@Entity()
@Index(['tUser', 'reply'], { unique: true })
export class Answer {
  @PrimaryGeneratedColumn()
  id: AnswerId

  @ManyToOne(() => TUser, (tUser) => tUser.answers, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  tUser: TUser

  @ManyToOne(() => Reply, (reply) => reply.answers, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  reply: Reply
}
