import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Replay } from './replays/entities/replay.entity'
import { ReplaysModule } from './replays/replays.module'
import { Chapter } from './stories2/entities/chapter.entity'
import { Sentence } from './stories2/entities/sentence.entity'
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
        type: 'mysql',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
