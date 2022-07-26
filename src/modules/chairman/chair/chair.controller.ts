import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChairService } from './chair.service';
import { CreateChairDto } from './dto/create-chair.dto';
import { UpdateChairDto } from './dto/update-chair.dto';

@Controller('api/chair')
export class ChairController {
  constructor(private readonly chairService: ChairService) {}

  @Get('hello')
  hello() {
    return 'chair';
  }

  @Post()
  async create(@Body() createChairDto: CreateChairDto) {
    return (await this.chairService.create(createChairDto)).toQueryChairDto();
  }

  @Get()
  async findAll() {
    return (await this.chairService.findAll()).map((i) => i.toQueryChairDto());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chairService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChairDto: UpdateChairDto) {
    return this.chairService.update(id, updateChairDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chairService.remove(id);
  }

  @Delete()
  clearDb(@Param('id') id: string) {
    return this.chairService.clearAll();
  }
}
