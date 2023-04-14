import { Sentence } from '../../src/sentences/entities/sentence.entity'
import { setSeederFactory } from 'typeorm-extension'

const DELAY_BEFORE_SENDING = [100, 300, 500, 1000]

export default setSeederFactory(Sentence, (faker) => {
  const item = new Sentence()

  item.text = faker.lorem.sentence(2)
  item.delayBeforeSending =
    DELAY_BEFORE_SENDING[
      faker.datatype.number({ min: 0, max: DELAY_BEFORE_SENDING.length - 1 })
    ]

  return item
})
