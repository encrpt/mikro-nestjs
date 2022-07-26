import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: EntityRepository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room: Room = new Room();
    room.title = createRoomDto.title || 'unknonw room';

    // `This action adds a new room ${createRoomDto.title}`;
    try {
      await this.roomRepository.persistAndFlush(room);
    } catch (e) {
      throw new MethodNotAllowedException();
    }

    return room;
  }

  findAll() {
    // `This action returns all room`;
    return this.roomRepository.findAll();
  }

  async findOne(id: string) {
    // return `This action returns a #${id} room`;
    const room = await this.roomRepository.findOne(id, {
      populate: ['chairs'],
    });
    if (room) {
      return room.toQueryRoomDto();
    } else {
      throw new NotFoundException();
    }
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  async remove(id: string) {
    // `This action removes a #${id} room`;
    const room: Room = this.roomRepository.getReference(id);
    if (room) {
      await this.roomRepository.removeAndFlush(room);
      return true;
    } else {
      throw new NotFoundException('roomId');
    }
  }

  async clearAll() {
    const rooms: Room[] = await this.findAll();
    for await (const room of rooms) {
      await this.roomRepository.removeAndFlush(room);
    }
  }
}
