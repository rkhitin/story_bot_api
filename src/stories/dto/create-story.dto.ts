import { IsNotEmpty } from 'class-validator'

export class CreateStoryDto {
  @IsNotEmpty()
  title: string

  description: string
}
