import { JwtAuthGuard } from '../auth/jwt-auth.guard'
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
  findAll() {
    return this.sentencesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const sentenceId = this.sentencesService.convertToSentenceId(id)
    return this.sentencesService.findOne(sentenceId)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSentenceDto: UpdateSentenceDto,
  ) {
    const sentenceId = this.sentencesService.convertToSentenceId(id)
    return this.sentencesService.update(sentenceId, updateSentenceDto)
  }

  @Patch(':id/reorder')
  reorder(
    @Param('id') id: string,
    @Body() reorderChapterDto: ReorderChapterDto,
  ) {
    const sentenceId = this.sentencesService.convertToSentenceId(id)
    return this.sentencesService.reorder(sentenceId, reorderChapterDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const sentenceId = this.sentencesService.convertToSentenceId(id)
    return this.sentencesService.remove(sentenceId)
  }
}
