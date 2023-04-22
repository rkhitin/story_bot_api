import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { convertToReplyId } from '../utils/type-convertors'
import { CreateReplyDto } from './dto/create-reply.dto'
import { UpdateReplyDto } from './dto/update-reply.dto'
import { RepliesService } from './replies.service'
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
@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  create(@Body() createReplyDto: CreateReplyDto) {
    return this.repliesService.create(createReplyDto)
  }

  @Get()
  findAll() {
    return this.repliesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const replyId = convertToReplyId(id)
    return this.repliesService.findOne(replyId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    const replyId = convertToReplyId(id)
    return this.repliesService.update(replyId, updateReplyDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const replyId = convertToReplyId(id)
    return this.repliesService.remove(replyId)
  }
}
