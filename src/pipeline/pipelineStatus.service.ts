import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PipelineStatusDto } from 'src/hamechidun/DTO/Pipelines.dto';
import { Pipelines } from './Pipelines.Entity';
import { Repository } from 'typeorm';
import { PipelineStatus } from './PipelineStatus.Entity';
import { EyeProduct } from 'src/eye/EyeProduct.entity';

@Injectable()
export class PipelineStatusService {
  constructor(
    @InjectRepository(PipelineStatus)
    private pipelineStatusRepository: Repository<PipelineStatus>,
  ) {}

  async savePipelineStatus(
    pipelineStatus: PipelineStatusDto,
  ): Promise<PipelineStatusDto> {
    return await this.pipelineStatusRepository.save(pipelineStatus);
  }

  async saveMultiplePipelineStatus(
    eye_productId: number,
    productId: number,
    pipelineIds: number[],
  ): Promise<PipelineStatusDto[]> {
    // const { id, eyeProductId, lastRunnedStatus, lastRunnedDate } = pipelineStatusRequest;
    console.log('WHY🎆🎇🧨: ' + eye_productId);
    const recordsToSave = pipelineIds.map((pipelineId) => ({
      eyeProductId: eye_productId,
      productId: productId,
      pipelineId,
      lastRunnedStatus: 'Pending',
      lastRunnedDate: null,
    }));

    return await this.pipelineStatusRepository.save(recordsToSave);
  }
}
