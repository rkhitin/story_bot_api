import { Chapter } from '../../src/chapters/entities/chapter.entity'
import { setSeederFactory } from 'typeorm-extension'

export default setSeederFactory(Chapter, (faker) => {
  const chapter = new Chapter()

  chapter.title = faker.lorem.sentence(2)
  chapter.description = faker.lorem.sentence()

  return chapter
})
