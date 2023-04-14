import { Replay } from './entities/replay.entity'
import { ReplaysController } from './replays.controller'
import { ReplaysService } from './replays.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Replay])],
  controllers: [ReplaysController],
  providers: [ReplaysService],
})
export class ReplaysModule {}
