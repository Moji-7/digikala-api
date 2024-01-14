import { Test, TestingModule } from '@nestjs/testing';
import { HamechidunService } from './hamechidun.service';

describe('HamechidunService', () => {
  let service: HamechidunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HamechidunService],
    }).compile();

    service = module.get<HamechidunService>(HamechidunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
