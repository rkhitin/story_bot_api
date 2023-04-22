import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

type UserId = number & { __type: 'UserId' }

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: UserId

  @Column({ unique: true })
  username: string

  @Column()
  passwordHash: string
}
