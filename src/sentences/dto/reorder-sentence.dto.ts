import { IsNotEmpty, IsNumber } from 'class-validator'

export class ReorderSentenceDto {
  @IsNotEmpty()
  @IsNumber()
  newOrdinalNumber: number
}
