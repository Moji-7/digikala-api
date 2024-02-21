import { Module } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { PipelineController } from './pipeline.controller';

@Module({
  providers: [PipelineService],
  controllers: [PipelineController]
})
export class PipelineModule {}
