import { Reply } from '../../src/replies/entities/reply.entity'
import { setSeederFactory } from 'typeorm-extension'

export default setSeederFactory(Reply, (faker) => {
  const item = new Reply()

  item.text = faker.lorem.sentence(2)
  item.hint = faker.lorem.sentence(6)

  return item
})
