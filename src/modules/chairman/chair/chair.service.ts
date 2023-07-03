import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateChairDto } from './dto/create-chair.dto';
import { UpdateChairDto } from './dto/update-chair.dto';
import { Chair } from './entities/chair.entity';

@Injectable()
export class ChairService {
  constructor(
    @InjectRepository(Chair)
    private chairRepository: EntityRepository<Chair>,

    private readonly em: EntityManager,
  ) {}

  async create(createChairDto: CreateChairDto): Promise<Chair> {
    const chair: Chair = new Chair();
    chair.title = createChairDto.title || 'unknonw chair';

    // `This action adds a new chair ${createChairDto.title}`;
    try {
      await this.em.persist(chair).flush();
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
    return `This action updates a #${id} chair, ${JSON.stringify(
      updateChairDto,
    )}`;
  }

  async remove(id: string) {
    // `This action removes a #${id} chair`;
    const chair: Chair = this.chairRepository.getReference(id);
    if (chair) {
      await this.em.remove(chair).flush();
      return true;
    } else {
      throw new NotFoundException('chairId');
    }
  }

  async clearAll() {
    const chairs: Chair[] = await this.findAll();
    for await (const chair of chairs) {
      await this.em.remove(chair).flush();
    }
  }
}
