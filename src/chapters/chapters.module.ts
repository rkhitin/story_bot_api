import { ChaptersController } from './chapters.controller'
import { ChaptersService } from './chapters.service'
import { Chapter } from './entities/chapter.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Chapter])],
  controllers: [ChaptersController],
  providers: [ChaptersService],
})
export class ChaptersModule {}
