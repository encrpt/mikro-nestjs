import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('api/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get('hello')
  hello() {
    return 'room';
  }

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    return (await this.roomService.create(createRoomDto)).toQueryRoomDto();
  }

  @Get()
  async findAll() {
    return (await this.roomService.findAll()).map((i) => i.toListRoomDto());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }

  @Delete()
  clearDb(@Param('id') id: string) {
    return this.roomService.clearAll();
  }

}
