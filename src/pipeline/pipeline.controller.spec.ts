import { Test, TestingModule } from '@nestjs/testing';
import { PipelineController } from './pipeline.controller';

describe('PipelineController', () => {
  let controller: PipelineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PipelineController],
    }).compile();

    controller = module.get<PipelineController>(PipelineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
