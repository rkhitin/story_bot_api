import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CreateStoryDto } from './dto/create-story.dto'
import { UpdateStoryDto } from './dto/update-story.dto'
import { StoriesService } from './stories.service'
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
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storiesService.create(createStoryDto)
  }

  @Get()
  findAll() {
    return this.storiesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const storyId = this.storiesService.convertToStoryId(id)
    return this.storiesService.findOne(storyId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    const storyId = this.storiesService.convertToStoryId(id)
    return this.storiesService.update(storyId, updateStoryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const storyId = this.storiesService.convertToStoryId(id)
    return this.storiesService.remove(storyId)
  }
}
