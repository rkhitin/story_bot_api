import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ReorderChapterDto } from '../chapters/dto/reorder-chapter.dto'
import { ChapterId } from '../chapters/entities/chapter.entity'
import { convertToSentenceId } from '../utils/type-convertors'
import { CreateSentenceDto } from './dto/create-sentence.dto'
import { UpdateSentenceDto } from './dto/update-sentence.dto'
import { SentencesService } from './sentences.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'

@UseGuards(JwtAuthGuard)
@Controller('sentences')
export class SentencesController {
  constructor(private readonly sentencesService: SentencesService) {}

  @Post()
  create(@Body() createSentenceDto: CreateSentenceDto) {
    return this.sentencesService.create(createSentenceDto)
  }

  @Get()
  findAll(
    @Query('chapterIds', new ParseArrayPipe({ items: Number, separator: ',' }))
    chapterIds: ChapterId[],
  ) {
    return this.sentencesService.findAll(chapterIds)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const sentenceId = convertToSentenceId(id)
    return this.sentencesService.findOne(sentenceId)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSentenceDto: UpdateSentenceDto,
  ) {
    const sentenceId = convertToSentenceId(id)
    return this.sentencesService.update(sentenceId, updateSentenceDto)
  }

  @Patch(':id/reorder')
  reorder(
    @Param('id') id: string,
    @Body() reorderChapterDto: ReorderChapterDto,
  ) {
    const sentenceId = convertToSentenceId(id)
    return this.sentencesService.reorder(sentenceId, reorderChapterDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const sentenceId = convertToSentenceId(id)
    return this.sentencesService.remove(sentenceId)
  }
}
