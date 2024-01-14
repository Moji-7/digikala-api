import { Test, TestingModule } from '@nestjs/testing';
import { DigikalaService } from './digikala.service';

describe('DigikalaService', () => {
  let service: DigikalaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigikalaService],
    }).compile();

    service = module.get<DigikalaService>(DigikalaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
