import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { AppTestModule } from '../../../app.test.module';
import { ChairService } from './chair.service';
import { Chair } from './entities/chair.entity';

describe('ChairService', () => {
  let service: ChairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule, MikroOrmModule.forFeature([Chair])],

      providers: [ChairService],
    }).compile();

    service = module.get<ChairService>(ChairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
