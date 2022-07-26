import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { AppTestModule } from '../../../app.test.module';
import { ChairModule } from '../chair/chair.module';
import { ChairService } from '../chair/chair.service';
import { Chair } from '../chair/entities/chair.entity';
import { Room } from './entities/room.entity';
import { RoomService } from './room.service';

describe('RoomService', () => {
  let roomService: RoomService;
  let chairService: ChairService;
  let room1Id: string;
  let room2Id: string;
  let chair1Id: string;
  let chair2Id: string;
  let chair3Id: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppTestModule,
        MikroOrmModule.forFeature([Room, Chair]),
        ChairModule,
      ],
      providers: [RoomService],
    }).compile();

    roomService = module.get<RoomService>(RoomService);
    chairService = module.get<ChairService>(ChairService);

    await roomService.clearAll();
    await chairService.clearAll();

    room1Id = (await roomService.create({ title: 'room_1' })).id;
    room2Id = (await roomService.create({ title: 'room_2' })).id;

    chair1Id = (await chairService.create({ title: 'chair_1' })).id;
    chair2Id = (await chairService.create({ title: 'chair_2' })).id;
    chair3Id = (await chairService.create({ title: 'chair_3' })).id;
  });

  it('should move chairs into room1', async () => {
    // move chairs in rooms
    let room1 = await roomService.findOne(room1Id);
    expect(room1?.chairs.length).toBe(0);
    await roomService.addChairToRoom(room1Id, chair1Id);
    room1 = await roomService.findOne(room1Id);
    expect(room1?.chairs.length).toBe(1);
  });

  it('should move chairs into room2', async () => {
    let room2 = await roomService.findOne(room2Id);
    expect(room2?.chairs.length).toBe(0);
    await roomService.addChairToRoom(room2Id, chair2Id);
    await roomService.addChairToRoom(room2Id, chair3Id);
    room2 = await roomService.findOne(room2Id);
    expect(room2?.chairs.length).toBe(2);

    const whereIsChair2 = await roomService.whereIsMyChair(chair2Id);
    expect(whereIsChair2.length).toBe(1);
    expect(whereIsChair2[0].id).toBe(room2Id);
  });

  it('should move chairs between rooms', async () => {
    await roomService.addChairToRoom(room1Id, chair2Id);

    const room1 = await roomService.findOne(room1Id);
    expect(room1?.chairs.length).toBe(2);
    const room2 = await roomService.findOne(room2Id);
    expect(room2?.chairs.length).toBe(1);

    const whereIsChair2 = await roomService.whereIsMyChair(chair2Id);
    expect(whereIsChair2.length).toBe(1);
    expect(whereIsChair2[0].id).toBe(room1Id);
  });

  it('should remove chair from room', async () => {
    await roomService.removeChairFromRoom(room1Id, chair2Id);
    const room1 = await roomService.findOne(room1Id);
    expect(room1?.chairs.length).toBe(1);
    const chair2 = await chairService.findOne(chair2Id);
    expect(chair2?.room).toBe(null);

    // fails
    const whereIsChair2 = await roomService.whereIsMyChair(chair2Id);
    expect(whereIsChair2.length).toBe(0);
  });
});
