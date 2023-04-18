import { Story } from '../../src/stories/entities/story.entity'
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'

export default class StorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Story)

    await repository.delete({})

    const userFactory = await factoryManager.get(Story)

    await userFactory.saveMany(5)

    console.log('StorySeeder: done!')
  }
}
