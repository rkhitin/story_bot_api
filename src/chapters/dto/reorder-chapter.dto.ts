import { IsNotEmpty, IsNumber } from 'class-validator'

export class ReorderChapterDto {
  @IsNotEmpty()
  @IsNumber()
  newOrdinalNumber: number
}
