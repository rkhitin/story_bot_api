import { Reply } from '../../src/replies/entities/reply.entity'
import { Sentence } from '../../src/sentences/entities/sentence.entity'
import { faker } from '@faker-js/faker'
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'

export default class SentenceSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Reply)
    const chapterRepository = dataSource.getRepository(Sentence)

    await repository.delete({})

    const factory = await factoryManager.get(Reply)
    const sentences = await chapterRepository.find()

    const replies: Reply[] = []

    for (const sentence of sentences) {
      const amount = faker.datatype.number({ min: 1, max: 4 })

      for (let i = 0; i < amount; i++) {
        const reply = await factory.make({}, false)

        reply.sentence = sentence
        reply.isActive = i === 0 || Math.random() > 0.3
        reply.isCorrect = i === 0

        replies.push(reply)
      }
    }

    await repository.save(replies)

    console.log('ReplySeeder: done!')
  }
}
