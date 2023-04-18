import { CreateStoryDto } from './dto/create-story.dto'
import { UpdateStoryDto } from './dto/update-story.dto'
import { Story } from './entities/story.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class StoriesService {
  constructor(@InjectRepository(Story) private repository: Repository<Story>) {}
  create(createStoryDto: CreateStoryDto) {
    const story = this.repository.create(createStoryDto)
    return this.repository.save(story)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  async update(id: number, updateStoryDto: UpdateStoryDto) {
    return this.repository.save({ id, ...updateStoryDto })
  }

  remove(id: number) {
    return this.repository.delete({ id })
  }

  /**
   * For now just return first active story.
   * In the future will give story in witch user is right now
   */
  getSentences(tUserId: number) {
    return this.repository
      .createQueryBuilder('story')
      .leftJoinAndSelect('story.chapters', 'chapter')
      .leftJoinAndSelect(
        'chapter.sentences',
        'sentence',
        'sentence.id NOT IN (SELECT sentenceId ' +
          'FROM replay ' +
          'INNER JOIN answer ' +
          'ON replay.id = answer.replayId ' +
          `WHERE answer.tUserId = ${tUserId})`,
      )
      .leftJoinAndSelect('sentence.replays', 'replay')
      .leftJoinAndSelect('replay.answers', 'answer')
      .where('story.isActive = true')
      .andWhere('chapter.isActive = true')
      .andWhere('sentence.isActive = true')
      .andWhere('replay.isActive = true')
      .orderBy('story.id')
      .addOrderBy('chapter.ordinalNumber')
      .addOrderBy('sentence.ordinalNumber')
      .getOne()
  }
}
