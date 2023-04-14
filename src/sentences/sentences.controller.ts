import { ReorderChapterDto } from '../chapters/dto/reorder-chapter.dto'
import { CreateSentenceDto } from './dto/create-sentence.dto'
import { UpdateSentenceDto } from './dto/update-sentence.dto'
import { SentencesService } from './sentences.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

@Controller('sentences')
export class SentencesController {
  constructor(private readonly sentencesService: SentencesService) {}

  @Post()
  create(@Body() createSentenceDto: CreateSentenceDto) {
    return this.sentencesService.create(createSentenceDto)
  }

  @Get()
  findAll() {
    return this.sentencesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sentencesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSentenceDto: UpdateSentenceDto
  ) {
    return this.sentencesService.update(+id, updateSentenceDto)
  }

  @Patch(':id/reorder')
  reorder(
    @Param('id') id: string,
    @Body() reorderChapterDto: ReorderChapterDto
  ) {
    return this.sentencesService.reorder(+id, reorderChapterDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sentencesService.remove(+id)
  }
}
