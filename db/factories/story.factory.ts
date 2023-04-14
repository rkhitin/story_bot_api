import { Story } from '../../src/stories/entities/story.entity'
import { setSeederFactory } from 'typeorm-extension'

export default setSeederFactory(Story, (faker) => {
  const story = new Story()

  story.title = faker.lorem.sentence(2)
  story.description = faker.lorem.sentence()

  return story
})
