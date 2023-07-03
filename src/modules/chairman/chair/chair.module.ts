import { Module } from '@nestjs/common';
import { ChairService } from './chair.service';
import { ChairController } from './chair.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Chair } from './entities/chair.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Chair] })],
  controllers: [ChairController],
  providers: [ChairService],
  exports: [ChairService],
})
export class ChairModule {}
