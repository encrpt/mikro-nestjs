import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { AppTestModule } from '../../../app.test.module';
import { ChairModule } from '../chair/chair.module';
import { Chair } from '../chair/entities/chair.entity';
import { Room } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

describe('RoomController', () => {
  let controller: RoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppTestModule,
        MikroOrmModule.forFeature([Room, Chair]),
        ChairModule,
      ],
      controllers: [RoomController],
      providers: [RoomService],
    }).compile();

    controller = module.get<RoomController>(RoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
