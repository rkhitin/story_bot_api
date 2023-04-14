import { OrderManagerService } from './order-manager.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [OrderManagerService],
  exports: [OrderManagerService],
})
export class OrderManagerModule {}
