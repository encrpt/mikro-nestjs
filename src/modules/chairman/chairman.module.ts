import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { ChairModule } from './chair/chair.module';

@Module({
  imports: [RoomModule, ChairModule]
})
export class ChairmanModule {}
