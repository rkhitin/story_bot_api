import { CreateStoryDto } from './create-story.dto'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateStoryDto extends PartialType(CreateStoryDto) {}
