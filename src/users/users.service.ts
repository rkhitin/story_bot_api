import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'

const SALT_ROUNDS = 10

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { username } })
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...user } = createUserDto

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

    return this.repository.save({ passwordHash, ...user })
  }
}
