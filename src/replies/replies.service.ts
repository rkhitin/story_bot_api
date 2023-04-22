import { CreateReplyDto } from './dto/create-reply.dto'
import { UpdateReplyDto } from './dto/update-reply.dto'
import { Reply, ReplyId } from './entities/reply.entity'
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

  findOne(id: ReplyId) {
    return this.repository.findOneBy({ id })
  }

  update(id: ReplyId, updateReplyDto: UpdateReplyDto) {
    return this.repository.save({ id, ...updateReplyDto })
  }

  remove(id: ReplyId) {
    return this.repository.delete({ id })
  }

  convertToReplyId(id: number | string): ReplyId {
    return <ReplyId>+id
  }
}
