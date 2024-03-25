import { Module } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { PipelineController } from './pipeline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pipelines } from './Pipelines.Entity';
import { PipelineStatus } from './PipelineStatus.Entity';
import { EyeModule } from 'src/eye/eye.module';
import { EyeProduct } from 'src/eye/EyeProduct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pipelines, PipelineStatus,EyeProduct])],
  providers: [PipelineService],
  controllers: [PipelineController],
})
export class PipelineModule {}
