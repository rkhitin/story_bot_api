import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createStoryDto: CreateUserDto) {
    return this.usersService.create(createStoryDto)
  }
}
