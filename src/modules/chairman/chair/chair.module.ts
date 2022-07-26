import { Module } from '@nestjs/common';
import { ChairService } from './chair.service';
import { ChairController } from './chair.controller';

@Module({
  controllers: [ChairController],
  providers: [ChairService]
})
export class ChairModule {}
