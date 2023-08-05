import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3003)
}

bootstrap()
