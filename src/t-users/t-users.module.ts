import { TUser } from './entities/t-user.entity'
import { TUsersService } from './t-users.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([TUser])],
  providers: [TUsersService],
  exports: [TUsersService],
})
export class TUsersModule {}
