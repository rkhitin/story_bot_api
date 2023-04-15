import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CreateReplayDto } from './dto/create-replay.dto'
import { UpdateReplayDto } from './dto/update-replay.dto'
import { ReplaysService } from './replays.service'
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
@Controller('replays')
export class ReplaysController {
  constructor(private readonly replaysService: ReplaysService) {}

  @Post()
  create(@Body() createReplayDto: CreateReplayDto) {
    return this.replaysService.create(createReplayDto)
  }

  @Get()
  findAll() {
    return this.replaysService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.replaysService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReplayDto: UpdateReplayDto) {
    return this.replaysService.update(+id, updateReplayDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.replaysService.remove(+id)
  }
}
