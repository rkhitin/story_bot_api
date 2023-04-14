import { Replay } from './src/replays/entities/replay.entity'
import { Chapter } from './src/stories2/entities/chapter.entity'
import { Sentence } from './src/stories2/entities/sentence.entity'
import { Story } from './src/stories/entities/story.entity'
import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config()

export default new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Story, Chapter, Sentence, Replay],
  migrations: ['migrations/*.ts'],
})
