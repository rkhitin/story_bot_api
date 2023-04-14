import { CreateSentenceDto } from './create-sentence.dto'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateSentenceDto extends PartialType(CreateSentenceDto) {}
