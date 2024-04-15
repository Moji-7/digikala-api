import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { delay, pipelines } from 'src/utility/delay';
import { TokenService } from 'src/token/token.service';
import { PipelineStatusDto } from 'src/hamechidun/DTO/Pipelines.dto';
import { PipelineStatus } from './PipelineStatus.Entity';
import { MyCacheService } from 'src/myCache/myCache.service';
import { RedisSubscriberService } from 'src/myCache/RedisSubscriberService';

import {
  MessagePattern,
  Payload,
  Ctx,
  RedisContext,
  ClientProxy,
} from '@nestjs/microservices';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PipelineStatusService } from './pipelineStatus.service';

@Controller('pipelinestatus')
export class PipelineStatusController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly pipelineStatusService: PipelineStatusService,
    private readonly myCacheService: MyCacheService,
    private readonly redisSubscriberService: RedisSubscriberService,
    private eventEmitter: EventEmitter2,
  ) {}

  // @Get('pipelineStatusSummery/:eyeProductId')
  // async get(@Param('eyeProductId') eyeProductId: number): Promise<PipelineStatus[]> {
  //   return this.pipelineService.findSummeryPipelineStatusByUser(11015166,eyeProductId);
  // }

  @Post('submit')
  async submit(@Body() pipelineStatusRequest: PipelineStatusDto): Promise<any> {
    const token = this.tokenService.getToken(); // Retrieve from service
    await this.pipelineStatusService.savePipelineStatus(pipelineStatusRequest);
  }
  @Post('submitMany')
  async submitMany(
    @Body() pipelineStatusRequest: PipelineStatusDto,
  ): Promise<any> {
    const token = this.tokenService.getToken(); // Retrieve from service
    const pipelineIds = [4, 5, 6]; // Assuming pipelineIds are fixed
    await this.pipelineStatusService.saveMultiplePipelineStatus(
      pipelineStatusRequest.eyeProductId,
      pipelineStatusRequest.productId,
      pipelineIds,
    );
  }
}
