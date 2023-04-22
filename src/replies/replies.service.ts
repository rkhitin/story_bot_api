import { CreateReplyDto } from './dto/create-reply.dto'
import { UpdateReplyDto } from './dto/update-reply.dto'
import { Reply } from './entities/reply.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class RepliesService {
  constructor(@InjectRepository(Reply) private repository: Repository<Reply>) {}

  create(createReplyDto: CreateReplyDto) {
    return this.repository.create(createReplyDto)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  update(id: number, updateReplyDto: UpdateReplyDto) {
    return this.repository.save({ id, ...updateReplyDto })
  }

  remove(id: number) {
    return this.repository.delete({ id })
  }
}
