import { CreateTUserDto } from './dto/create-t-user.dto'
import { TUser } from './entities/t-user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TUsersService {
  constructor(@InjectRepository(TUser) private repository: Repository<TUser>) {}

  async find(username: string, telegramId: number): Promise<TUser | undefined> {
    return this.repository.findOne({ where: { username, telegramId } })
  }

  async create(createTUserDto: CreateTUserDto): Promise<TUser | null> {
    return await this.repository.save(createTUserDto)
  }
}
