import { CreateReplayDto } from './create-replay.dto'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateReplayDto extends PartialType(CreateReplayDto) {}
