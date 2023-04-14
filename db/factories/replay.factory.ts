import { Replay } from '../../src/replays/entities/replay.entity'
import { setSeederFactory } from 'typeorm-extension'

export default setSeederFactory(Replay, (faker) => {
  const item = new Replay()

  item.text = faker.lorem.sentence(2)
  item.hint = faker.lorem.sentence(6)

  return item
})
