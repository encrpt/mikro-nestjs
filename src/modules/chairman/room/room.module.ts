import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Room } from './entities/room.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
