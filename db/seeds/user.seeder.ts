import { User } from '../../src/users/entities/user.entity'
import * as bcrypt from 'bcrypt'
import { DataSource } from 'typeorm'
import { Seeder } from 'typeorm-extension'

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User)

    await repository.delete({})

    const passwordHash = await bcrypt.hash('admin', 10)

    await repository.save({
      username: 'admin',
      passwordHash,
    })

    console.log('UserSeeder: done!')
  }
}
