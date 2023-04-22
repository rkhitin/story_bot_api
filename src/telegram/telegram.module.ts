import { AnswersModule } from '../answers/answers.module'
import { SentencesModule } from '../sentences/sentences.module'
import { StoriesModule } from '../stories/stories.module'
import { TUsersModule } from '../t-users/t-users.module'
import { TelegramService } from './telegram.service'
import { TelegramUpdate } from './telegram.update'
import { Module } from '@nestjs/common'

@Module({
  imports: [TUsersModule, StoriesModule, AnswersModule, SentencesModule],
  providers: [TelegramUpdate, TelegramService],
})
export class TelegramModule {}
