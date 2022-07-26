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
  async findOne(@Param('id') id: string) {
    const room = await this.roomService.findOne(id);
    if (room) {
      return room.toQueryRoomDto();
    } else {
      throw new NotFoundException();
    }
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

  // relations - dev only, TODO should post
  @Get(':roomId/put-in/:chairId')
  putIn(@Param('roomId') roomId: string, @Param('chairId') chairId: string) {
    this.roomService.addChairToRoom(roomId, chairId);
  }

  @Get(':roomId/pull-out/:chairId')
  pullOut(@Param('roomId') roomId: string, @Param('chairId') chairId: string) {
    this.roomService.removeChairFromRoom(roomId, chairId);
  }
}
