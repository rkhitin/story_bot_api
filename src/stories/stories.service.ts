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
}
