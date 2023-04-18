import { Chapter } from '../../src/chapters/entities/chapter.entity'
import { Sentence } from '../../src/sentences/entities/sentence.entity'
import { faker } from '@faker-js/faker'
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'

export default class SentenceSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Sentence)
    const chapterRepository = dataSource.getRepository(Chapter)

    await repository.delete({})

    const factory = await factoryManager.get(Sentence)
    const chapters = await chapterRepository.find()

    const sentences: Sentence[] = []

    for (const chapter of chapters) {
      const amount = faker.datatype.number({ min: 5, max: 30 })

      for (let i = 0; i < amount; i++) {
        const sentence = await factory.make({}, false)

        sentence.text += i
        sentence.chapter = chapter
        sentence.ordinalNumber = i + 1
        sentence.isActive = Math.random() > 0.3

        sentences.push(sentence)
      }
    }

    await repository.save(sentences)

    console.log('SentenceSeeder: done!')
  }
}
