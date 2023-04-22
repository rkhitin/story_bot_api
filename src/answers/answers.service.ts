import { CreateAnswerDto } from './dto/create-answer.dto'
import { Answer } from './entities/answer.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer) private repository: Repository<Answer>,
  ) {}

  create(createAnswerDto: CreateAnswerDto) {
    return this.repository.save({
      tUser: { id: createAnswerDto.tUserId },
      reply: { id: createAnswerDto.replyId },
    })
  }

  findAll() {
    return `This action returns all answers`
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`
  }

  remove(id: number) {
    return `This action removes a #${id} answer`
  }
}
