import { Module } from '@nestjs/common';
import { ChairService } from './chair.service';
import { ChairController } from './chair.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Chair } from './entities/chair.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Chair])],
  controllers: [ChairController],
  providers: [ChairService],
})
export class ChairModule {}
