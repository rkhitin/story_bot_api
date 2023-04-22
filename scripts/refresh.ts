import { exec } from 'child_process'

exec('npm run db:drop')
exec('npm run db:create')
exec('rm -rf db/migrations/*')
exec(`npm run m:g db/migrations/init`)
exec('npm run m:r')
exec('npm run seed')
