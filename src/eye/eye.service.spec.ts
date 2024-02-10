import { Test, TestingModule } from '@nestjs/testing';
import { EyeService } from './eye.service';

describe('EyeService', () => {
  let service: EyeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EyeService],
    }).compile();

    service = module.get<EyeService>(EyeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
