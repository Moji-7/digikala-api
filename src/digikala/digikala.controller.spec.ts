import { Test, TestingModule } from '@nestjs/testing';
import { DigikalaController } from './digikala.controller';

describe('DigikalaController', () => {
  let controller: DigikalaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigikalaController],
    }).compile();

    controller = module.get<DigikalaController>(DigikalaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
