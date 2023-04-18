import { AnswersModule } from '../answers/answers.module'
import { StoriesModule } from '../stories/stories.module'
import { TUsersModule } from '../t-users/t-users.module'
import { TelegramUpdate } from './telegram.update'
import { Module } from '@nestjs/common'

@Module({
  imports: [TUsersModule, StoriesModule, AnswersModule],
  providers: [TelegramUpdate],
})
export class TelegramModule {}
