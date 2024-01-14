import { Test, TestingModule } from '@nestjs/testing';
import { HamechidunController } from './hamechidun.controller';

describe('HamechidunController', () => {
  let controller: HamechidunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HamechidunController],
    }).compile();

    controller = module.get<HamechidunController>(HamechidunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
