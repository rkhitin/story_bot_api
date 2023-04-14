import { CreateChapterDto } from './dto/create-chapter.dto'
import { ReorderChapterDto } from './dto/reorder-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'
import { Chapter } from './entities/chapter.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter) private repository: Repository<Chapter>,
    private dataSource: DataSource
  ) {}

  async create(createChapterDto: CreateChapterDto) {
    const { storyId, ...rest } = createChapterDto

    const insert = await this.repository
      .createQueryBuilder()
      .insert()
      .into(Chapter)
      .values({
        ...rest,
        story: { id: storyId },
        ordinalNumber: () =>
          `(SELECT count(c.id) + 1 from ${this.repository.metadata.tableName} c)`,
      })
      .returning('*')
      .execute()

    return insert.generatedMaps[0]
  }

  async reorder(id: number, reorderChapterDto: ReorderChapterDto) {
    const currentChapter = await this.repository.findOneBy({ id })
    const targetChapter = await this.repository.findOneBy({
      ordinalNumber: reorderChapterDto.newOrdinalNumber,
    })

    targetChapter.ordinalNumber = currentChapter.ordinalNumber
    currentChapter.ordinalNumber = reorderChapterDto.newOrdinalNumber

    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.save([currentChapter, targetChapter])

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }

    return [currentChapter, targetChapter]
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
