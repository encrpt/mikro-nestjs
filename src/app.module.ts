import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChairModule } from './modules/chairman/chair/chair.module';
import { RoomModule } from './modules/chairman/room/room.module';

@Module({
  imports: [MikroOrmModule.forRoot(), RoomModule, ChairModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
