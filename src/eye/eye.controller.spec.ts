import { Test, TestingModule } from '@nestjs/testing';
import { EyeController } from './eye.controller';

describe('EyeController', () => {
  let controller: EyeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EyeController],
    }).compile();

    controller = module.get<EyeController>(EyeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
