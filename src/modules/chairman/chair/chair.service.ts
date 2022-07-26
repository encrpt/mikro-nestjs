import { Injectable } from '@nestjs/common';
import { CreateChairDto } from './dto/create-chair.dto';
import { UpdateChairDto } from './dto/update-chair.dto';

@Injectable()
export class ChairService {
  create(createChairDto: CreateChairDto) {
    return 'This action adds a new chair';
  }

  findAll() {
    return `This action returns all chair`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chair`;
  }

  update(id: number, updateChairDto: UpdateChairDto) {
    return `This action updates a #${id} chair`;
  }

  remove(id: number) {
    return `This action removes a #${id} chair`;
  }
}
