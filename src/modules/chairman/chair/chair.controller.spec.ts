import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { AppTestModule } from '../../../app.test.module';
import { ChairController } from './chair.controller';
import { ChairService } from './chair.service';
import { Chair } from './entities/chair.entity';

describe('ChairController', () => {
  let controller: ChairController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule, MikroOrmModule.forFeature([Chair])],
      controllers: [ChairController],
      providers: [ChairService],
    }).compile();

    controller = module.get<ChairController>(ChairController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
