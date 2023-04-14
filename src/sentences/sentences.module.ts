import { OrderManagerModule } from '../order-manager/order-manager.module'
import { Sentence } from './entities/sentence.entity'
import { SentencesController } from './sentences.controller'
import { SentencesService } from './sentences.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Sentence]), OrderManagerModule],
  controllers: [SentencesController],
  providers: [SentencesService],
})
export class SentencesModule {}
