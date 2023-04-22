import { TUserId } from '../t-users/entities/t-user.entity'
import { CreateStoryDto } from './dto/create-story.dto'
import { UpdateStoryDto } from './dto/update-story.dto'
import { Story, StoryId } from './entities/story.entity'
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

  findOne(id: StoryId) {
    return this.repository.findOneBy({ id })
  }

  async update(id: StoryId, updateStoryDto: UpdateStoryDto) {
    return this.repository.save({ id, ...updateStoryDto })
  }

  remove(id: StoryId) {
    return this.repository.delete({ id })
  }

  /**
   * For now just return first active story.
   * In the future will give story in witch user is right now
   *
   * Also, maybe some kind of cashing is needed here?
   */
  getStoryForUser(tUserId: TUserId) {
    return this.repository
      .createQueryBuilder('story')
      .leftJoinAndSelect('story.chapters', 'chapter')
      .leftJoinAndSelect(
        'chapter.sentences',
        'sentence',
        'sentence.id NOT IN (SELECT sentenceId ' +
          'FROM reply ' +
          'INNER JOIN answer ' +
          'ON reply.id = answer.replyId ' +
          `WHERE answer.tUserId = ${tUserId})`,
      )
      .leftJoinAndSelect('sentence.replies', 'reply')
      .leftJoinAndSelect('reply.answers', 'answer')
      .where('story.isActive = true')
      .andWhere('chapter.isActive = true')
      .andWhere('sentence.isActive = true')
      .andWhere('reply.isActive = true')
      .orderBy('story.id')
      .addOrderBy('chapter.ordinalNumber')
      .addOrderBy('sentence.ordinalNumber')
      .getOne()
  }

  convertToStoryId(id: number | string): StoryId {
    return <StoryId>+id
  }
}
