import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ChaptersService } from './chapters.service'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { ReorderChapterDto } from './dto/reorder-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'
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
@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto)
  }

  @Get()
  findAll() {
    return this.chaptersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const chapterId = this.chaptersService.convertToChapterId(id)
    return this.chaptersService.findOne(chapterId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(+id, updateChapterDto)
  }

  @Patch(':id/reorder')
  reorder(
    @Param('id') id: string,
    @Body() reorderChapterDto: ReorderChapterDto,
  ) {
    const chapterId = this.chaptersService.convertToChapterId(id)
    return this.chaptersService.reorder(chapterId, reorderChapterDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const chapterId = this.chaptersService.convertToChapterId(id)
    return this.chaptersService.remove(chapterId)
  }
}
