import { CreateTUserDto } from './dto/create-t-user.dto'
import { TUser } from './entities/t-user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TUsersService {
  constructor(@InjectRepository(TUser) private repository: Repository<TUser>) {}

  async create(createTUserDto: CreateTUserDto): Promise<TUser | null> {
    try {
      return await this.repository.save(createTUserDto)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return null
      }

      throw error
    }
  }
}
