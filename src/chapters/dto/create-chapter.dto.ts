import { StoryId } from '../../stories/entities/story.entity'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateChapterDto {
  @IsString()
  title: string

  @IsNotEmpty()
  @IsNumber()
  storyId: StoryId

  description?: string
}
