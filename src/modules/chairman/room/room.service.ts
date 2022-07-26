import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { ChairService } from '../chair/chair.service';
import { Chair } from '../chair/entities/chair.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomModule } from './room.module';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: EntityRepository<Room>,
    private chairService: ChairService,
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
    return this.roomRepository.findOne(id, {
      populate: ['chairs'],
    });
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

  // realations
  async addChairToRoom(roomId: string, chairId: string) {
    const room = await this.findOne(roomId);
    const chair = await this.chairService.findOne(chairId);
    if (room && chair && !room.chairs.contains(chair)) {
      room.chairs.add(chair);
      await this.roomRepository.persistAndFlush(room);
    }
  }

  /* https://mikro-orm.io/docs/cascading#orphan-removal

    await author.books.set([book1, book2]); // replace whole collection
    await author.books.remove(book1); // remove book from collection
    await orm.em.persistAndFlush(author); // book1 will be removed, as well as all original items (before we called `set()`)
  */
  async removeChairFromRoom(roomId: string, chairId: string) {
    const room = await this.findOne(roomId);
    const chair = await this.chairService.findOne(chairId);
    if (room && chair && room.chairs.contains(chair)) {
      // room.chairs.remove(chair);
      // room.chairs.set(room.chairs.getItems().filter((i) => i.id !== chairId));
      // room.chairs.set([]);
      room.chairs.removeAll();
      console.log('isDirty:', room.chairs.isDirty());
      await this.roomRepository.persistAndFlush(room);
      console.log('isDirty:', room.chairs.isDirty());
    }
    await this.roomRepository.flush();
  }
}
