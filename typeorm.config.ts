import { Chapter } from './src/chapters/entities/chapter.entity'
import { Replay } from './src/replays/entities/replay.entity'
import { Sentence } from './src/sentences/entities/sentence.entity'
import { Story } from './src/stories/entities/story.entity'
import { User } from './src/users/entities/user.entity'
import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'

config()

const options: SeederOptions & DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Story, Chapter, Sentence, Replay, User],
  migrations: ['db/migrations/*.ts'],
  seeds: [
    'db/seeds/story.seeder.ts',
    'db/seeds/chapter.seeder.ts',
    'db/seeds/sentence.seeder.ts',
    'db/seeds/replay.seeder.ts',
  ],
  factories: ['db/factories/*.ts'],
}

export default new DataSource(options)
