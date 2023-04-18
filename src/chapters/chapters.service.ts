import { OrderManagerService } from '../order-manager/order-manager.service'
import { Story } from '../stories/entities/story.entity'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { ReorderChapterDto } from './dto/reorder-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'
import { Chapter } from './entities/chapter.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter) private repository: Repository<Chapter>,
    private orderManagerService: OrderManagerService,
  ) {}

  async create(createChapterDto: CreateChapterDto) {
    const { storyId, ...rest } = createChapterDto
    const story = new Story()

    story.id = storyId

    return this.orderManagerService.createWithOrdinalNumber(
      { ...rest, story },
      this.repository.createQueryBuilder(),
      this.repository.metadata.tableName,
    )
  }

  async reorder(id: number, reorderChapterDto: ReorderChapterDto) {
    const currentChapter = await this.repository.findOneBy({ id })
    const targetChapter = await this.repository.findOneBy({
      ordinalNumber: reorderChapterDto.newOrdinalNumber,
    })

    return this.orderManagerService.reorder(currentChapter, targetChapter)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return this.repository.save({ id, ...updateChapterDto })
  }

  remove(id: number) {
    return this.repository.delete({ id })
  }
}
