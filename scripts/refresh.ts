import { exec as rawExec } from 'node:child_process'
import * as util from 'node:util'

const exec = util.promisify(rawExec)

async function run() {
  await exec('npm run db:drop')
  console.log('Dropped')
  await exec('npm run db:create')
  console.log('Created')
  await exec('rm -rf db/migrations/*')
  console.log('Removed migrations')
  await exec(`npm run m:g db/migrations/init`)
  console.log('Generated init migration')
  await exec('npm run m:r')
  console.log('Ran migrations')
  await exec('npm run seed')
  console.log('Seeded')

  console.log('All Done')
}

run()
