import { AnswersModule } from './answers/answers.module'
import { Answer } from './answers/entities/answer.entity'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ChaptersModule } from './chapters/chapters.module'
import { Chapter } from './chapters/entities/chapter.entity'
import { OrderManagerModule } from './order-manager/order-manager.module'
import { Reply } from './replies/entities/reply.entity'
import { RepliesModule } from './replies/replies.module'
import { Sentence } from './sentences/entities/sentence.entity'
import { SentencesModule } from './sentences/sentences.module'
import { Story } from './stories/entities/story.entity'
import { StoriesModule } from './stories/stories.module'
import { TUser } from './t-users/entities/t-user.entity'
import { TUsersModule } from './t-users/t-users.module'
import { TelegramModule } from './telegram/telegram.module'
import { User } from './users/entities/user.entity'
import { UsersModule } from './users/users.module'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TelegrafModule } from 'nestjs-telegraf'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Reply, Sentence, Chapter, Story, User, TUser, Answer],
        synchronize: true,
        logging: false,
      }),
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('TELEGRAM_TOKEN'),
        include: [TelegramModule],
      }),
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
    }),
    StoriesModule,
    RepliesModule,
    ChaptersModule,
    SentencesModule,
    OrderManagerModule,
    AuthModule,
    UsersModule,
    TelegramModule,
    TUsersModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
