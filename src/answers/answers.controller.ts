import { AnswersService } from './answers.service'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get()
  findAll() {
    return this.answersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id)
  }
}
