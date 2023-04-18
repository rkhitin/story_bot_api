import { ReorderChapterDto } from '../chapters/dto/reorder-chapter.dto'
import { Chapter } from '../chapters/entities/chapter.entity'
import { OrderManagerService } from '../order-manager/order-manager.service'
import { CreateSentenceDto } from './dto/create-sentence.dto'
import { UpdateSentenceDto } from './dto/update-sentence.dto'
import { Sentence } from './entities/sentence.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class SentencesService {
  constructor(
    @InjectRepository(Sentence) private repository: Repository<Sentence>,
    private dataSource: DataSource,
    private orderManagerService: OrderManagerService,
  ) {}

  async create(createSentenceDto: CreateSentenceDto) {
    const { chapterId, ...rest } = createSentenceDto
    const chapter = new Chapter()

    chapter.id = chapterId

    return this.orderManagerService.createWithOrdinalNumber(
      { ...rest, chapter },
      this.repository.createQueryBuilder(),
      this.repository.metadata.tableName,
    )
  }

  async reorder(id: number, reorderSentenceDto: ReorderChapterDto) {
    const currentSentence = await this.repository.findOneBy({ id })
    const targetSentence = await this.repository.findOneBy({
      ordinalNumber: reorderSentenceDto.newOrdinalNumber,
    })

    return this.orderManagerService.reorder(currentSentence, targetSentence)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  update(id: number, updateSentenceDto: UpdateSentenceDto) {
    return this.repository.save({ id, ...updateSentenceDto })
  }

  remove(id: number) {
    return this.repository.delete({ id })
  }
}
