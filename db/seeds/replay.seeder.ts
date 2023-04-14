import { Replay } from '../../src/replays/entities/replay.entity'
import { Sentence } from '../../src/sentences/entities/sentence.entity'
import { faker } from '@faker-js/faker'
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'

export default class SentenceSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(Replay)
    const chapterRepository = dataSource.getRepository(Sentence)

    await repository.delete({})

    const factory = await factoryManager.get(Replay)
    const sentences = await chapterRepository.find()

    const replays: Replay[] = []

    for (const sentence of sentences) {
      const amount = faker.datatype.number({ min: 1, max: 4 })

      for (let i = 0; i < amount; i++) {
        const replay = await factory.make({}, false)

        replay.sentence = sentence
        replay.isActive = Math.random() > 0.3

        replays.push(replay)
      }
    }

    await repository.save(replays)

    console.log('ReplaySeeder: done!')
  }
}
