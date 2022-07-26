import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { Room } from '../room/entities/room.entity';
import { CreateChairDto } from './dto/create-chair.dto';
import { UpdateChairDto } from './dto/update-chair.dto';
import { Chair } from './entities/chair.entity';

@Injectable()
export class ChairService {
  constructor(
    @InjectRepository(Chair)
    private chairRepository: EntityRepository<Chair>,
  ) {}

  async create(createChairDto: CreateChairDto): Promise<Chair> {
    const chair: Chair = new Chair();
    chair.title = createChairDto.title || 'unknonw chair';

    // `This action adds a new chair ${createChairDto.title}`;
    try {
      await this.chairRepository.persistAndFlush(chair);
    } catch (e) {
      throw new MethodNotAllowedException();
    }

    return chair;
  }

  findAll() {
    // `This action returns all chair`;
    return this.chairRepository.findAll();
  }

  findOne(id: string) {
    // return `This action returns a #${id} chair`;
    return this.chairRepository.findOne(id);
  }

  update(id: string, updateChairDto: UpdateChairDto) {
    return `This action updates a #${id} chair`;
  }

  async remove(id: string) {
    // `This action removes a #${id} chair`;
    const chair: Chair = this.chairRepository.getReference(id);
    if (chair) {
      await this.chairRepository.removeAndFlush(chair);
      return true;
    } else {
      throw new NotFoundException('chairId');
    }
  }

  async clearAll() {
    const chairs: Chair[] = await this.findAll();
    for await (const chair of chairs) {
      await this.chairRepository.removeAndFlush(chair);
    }
  }
}
