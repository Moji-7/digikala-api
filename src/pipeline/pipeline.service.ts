import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PipelineStatusDto } from 'src/hamechidun/DTO/Pipelines.dto';
import { Pipelines } from './Pipelines.Entity';
import { Repository } from 'typeorm';
import { PipelineStatus } from './PipelineStatus.Entity';
import { EyeProduct } from 'src/eye/EyeProduct.entity';

@Injectable()
export class PipelineService {

  constructor(
    @InjectRepository(PipelineStatus)
    private pipelineStatusRepository: Repository<PipelineStatus>,
 
    @InjectRepository(EyeProduct)
    private eyeProductRepository: Repository<EyeProduct>,
  ) {}
 

  async findSummeryPipelineStatusByUser(userId: number,eyeProductId:number): Promise<PipelineStatus[]> {
    return this.pipelineStatusRepository
    .createQueryBuilder('ps')
    .select('ps') // Selects all columns from pipelineStatus
    .addSelect('ep.productId') // Adds productId from eye_product
    .innerJoin(
      (subQuery) => {
        return subQuery
          .select('eyeProductId, MAX(lastRunnedDate) AS MaxDate')
          .from(PipelineStatus, 'pipelineStatus')
          .groupBy('eyeProductId');
      },
      'latestPS',
      `ps.eyeProductId = latestPS.eyeProductId AND 
      (ps.lastRunnedDate = latestPS.MaxDate OR 
      (ps.lastRunnedDate IS NULL AND latestPS.MaxDate IS NULL))`
    )
    .innerJoin('ps.eyeProduct', 'ep', 'ep.userId = :userId AND ep.id = :eyeProductId', { userId, eyeProductId })
    .getMany();
  }  
    async findLatestPipelineStatusByUser(userId: number): Promise<PipelineStatus[]> {
    return this.pipelineStatusRepository
      .createQueryBuilder('ps')
      .innerJoin(
        (subQuery) => {
          return subQuery
            .select('eyeProductId, MAX(lastRunnedDate) AS MaxDate')
            .from(PipelineStatus, 'pipelineStatus')
            .groupBy('eyeProductId');
        },
        'latestPS',
        'ps.eyeProductId = latestPS.eyeProductId AND ps.lastRunnedDate = latestPS.MaxDate'
      )
      .innerJoinAndSelect('ps.eyeProduct', 'ep', 'ep.userId = :userId', { userId })
      .getMany();
  }

  async savePipelineStatus(pipelineStatus: PipelineStatusDto): Promise<PipelineStatusDto> {
    return await this.pipelineStatusRepository.save(pipelineStatus);
  }

}
