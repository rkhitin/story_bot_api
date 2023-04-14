import { Reordable } from './order-manager.types'
import { Injectable } from '@nestjs/common'
import { DataSource, SelectQueryBuilder } from 'typeorm'

@Injectable()
export class OrderManagerService {
  constructor(private dataSource: DataSource) {}

  async createWithOrdinalNumber<T>(
    entityData: Partial<T>,
    queryBuilder: SelectQueryBuilder<T>,
    tableName: string
  ) {
    const insert = await queryBuilder
      .insert()
      .into(tableName)
      .values({
        ...entityData,
        ordinalNumber: () => `(SELECT count(c.id) + 1 from ${tableName} c)`,
      })
      .returning('*')
      .execute()

    return insert.generatedMaps[0]
  }

  async reorder<T extends Reordable>(currentItem: T, targetItem: T) {
    const currentItemOrdinalNumber = currentItem.ordinalNumber

    currentItem.ordinalNumber = targetItem.ordinalNumber
    targetItem.ordinalNumber = currentItemOrdinalNumber

    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.save([currentItem, targetItem])

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }

    return [currentItem, targetItem]
  }
}
