import { Reply } from '../replies/entities/reply.entity'
import { TUser, TUserId } from '../t-users/entities/t-user.entity'
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

  async getUnansweredSentences(tUserId: TUserId) {
    return this.repository
      .createQueryBuilder('answer')
      .leftJoinAndSelect('answer.reply', 'reply')
      .leftJoinAndSelect('reply.sentence', 'sentence')
      .where('answer.tUserId = :tUserId', { tUserId })
      .printSql()
      .getMany()
  }

  // getAnswerQB(storyId: number, tUserId: TUserId) {
  //   return this.repository
  //     .createQueryBuilder('answer')
  //     .select('reply.id')
  //     .innerJoin('answer.reply', 'reply')
  //     .innerJoin('reply.sentence', 'sentence')
  //     .innerJoin('sentence.chapter', 'chapter')
  //     .innerJoin('chapter.story', 'story')
  //     .where('answer.tUserId = :tUserId', { tUserId })
  //     .andWhere('story.id = :storyId', { storyId })
  //     .getMany()
  // }
}
