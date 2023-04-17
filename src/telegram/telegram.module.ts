import { TUsersModule } from '../t-users/t-users.module'
import { TelegramUpdate } from './telegram.update'
import { Module } from '@nestjs/common'

@Module({
  imports: [TUsersModule],
  providers: [TelegramUpdate],
})
export class TelegramModule {}
