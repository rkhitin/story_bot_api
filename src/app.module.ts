import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ChaptersModule } from './chapters/chapters.module'
import { Chapter } from './chapters/entities/chapter.entity'
import { Replay } from './replays/entities/replay.entity'
import { ReplaysModule } from './replays/replays.module'
import { Sentence } from './sentences/entities/sentence.entity'
import { SentencesModule } from './sentences/sentences.module'
import { Story } from './stories/entities/story.entity'
import { StoriesModule } from './stories/stories.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Replay, Sentence, Chapter, Story],
        synchronize: true,
      }),

      inject: [ConfigService],
    }),
    StoriesModule,
    ReplaysModule,
    ChaptersModule,
    SentencesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
