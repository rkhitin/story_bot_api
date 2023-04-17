import { CreateAnswerDto } from './dto/create-answer.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AnswersService {
  create(createAnswerDto: CreateAnswerDto) {
    return 'This action adds a new answer'
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
