import { CreateReplayDto } from './dto/create-replay.dto'
import { UpdateReplayDto } from './dto/update-replay.dto'
import { Replay } from './entities/replay.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ReplaysService {
  constructor(
    @InjectRepository(Replay) private repository: Repository<Replay>
  ) {}

  create(createReplayDto: CreateReplayDto) {
    return this.repository.create(createReplayDto)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  update(id: number, updateReplayDto: UpdateReplayDto) {
    return this.repository.save({ id, ...updateReplayDto })
  }

  remove(id: number) {
    return this.repository.delete({ id })
  }
}
