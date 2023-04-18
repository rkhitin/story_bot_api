import { Chapter } from '../../src/chapters/entities/chapter.entity'
import { Story } from '../../src/stories/entities/story.entity'
import { faker } from '@faker-js/faker'
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'

export default class ChapterSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Chapter)
    const storyRepository = dataSource.getRepository(Story)

    await repository.delete({})

    const factory = await factoryManager.get(Chapter)
    const stories = await storyRepository.find()

    const chapters: Chapter[] = []

    for (const story of stories) {
      const chaptersAmount = faker.datatype.number({ min: 2, max: 8 })

      for (let i = 0; i < chaptersAmount; i++) {
        const chapter = await factory.make({}, false)

        chapter.story = story
        chapter.ordinalNumber = i + 1
        chapter.isActive = Math.random() > 0.3

        chapters.push(chapter)
      }
    }

    await repository.save(chapters)

    console.log('ChapterSeeder: done!')
  }
}
