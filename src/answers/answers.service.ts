import { Replay } from '../replays/entities/replay.entity'
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
      replay: { id: createAnswerDto.replayId },
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
      .leftJoinAndSelect('answer.replay', 'replay')
      .leftJoinAndSelect('replay.sentence', 'sentence')
      .where('answer.tUserId = :tUserId', { tUserId })
      .printSql()
      .getMany()
  }

  // getAnswerQB(storyId: number, tUserId: TUserId) {
  //   return this.repository
  //     .createQueryBuilder('answer')
  //     .select('replay.id')
  //     .innerJoin('answer.replay', 'replay')
  //     .innerJoin('replay.sentence', 'sentence')
  //     .innerJoin('sentence.chapter', 'chapter')
  //     .innerJoin('chapter.story', 'story')
  //     .where('answer.tUserId = :tUserId', { tUserId })
  //     .andWhere('story.id = :storyId', { storyId })
  //     .getMany()
  // }
}
