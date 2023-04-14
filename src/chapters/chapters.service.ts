import { CreateChapterDto } from './dto/create-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'
import { Chapter } from './entities/chapter.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter) private repository: Repository<Chapter>
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
