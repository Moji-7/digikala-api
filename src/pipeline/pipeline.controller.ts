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

@Controller('pipeline')
export class PipelineController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly pipelineService: PipelineService,
    private readonly myCacheService: MyCacheService,
    private readonly redisSubscriberService: RedisSubscriberService,
    private eventEmitter: EventEmitter2,
  ) {}
  // async onModuleInit() {
  //   await this.redisSubscriberService.subscribeToChannel('response_received');
  // }
  @Get('pipelineStatusSummery/:eyeProductId')
  async get(
    @Param('eyeProductId') eyeProductId: number,
  ): Promise<PipelineStatus[]> {
    const pipelineStatuses =
      await this.pipelineService.findSummeryPipelineStatusByUser(
        11015166,
        eyeProductId,
      );
    //for Lazy=true promise response!
    const results = await Promise.all(
      pipelineStatuses.map(async (status) => {
        const eyeProduct = await status.eyeProduct;
        return {
          ...status,
          productId: eyeProduct.productId,
        };
      }),
    );
    return results;
  }

  @Post('submitStatus')
  async create(@Body() pipelineStatusRequest: PipelineStatusDto): Promise<any> {
    const token = this.tokenService.getToken(); // Retrieve from service

    // await this.pipelineService.savePipelineStatus(pipelineStatusRequest);
    try {
      //await this.sendRedis('pipeline_', pipelineStatusRequest);

      //Emitting an event with the payload
      // this.eventEmitter.emit(
      //   'pipeline.status.submitted',
      //   `${pipelineStatusRequest.eyeProductId}-${pipelineStatusRequest.pipelineId}`
      // );

      console.log('Step 1 ==>from clinet to Nest ***Rest***');
      let payload = {
        channel: 'rest_redis_channel',
        message: {
          pipelineId: pipelineStatusRequest.pipelineId,
          eyeProductId: pipelineStatusRequest.eyeProductId,
          productId: pipelineStatusRequest.productId,
        },
      };
      this.eventEmitter.emit('pipeline.status.submitted', payload);

      //await delay(Math.floor(Math.random() * 2) + 5, true); // Wait for 3 seconds with resultStatus as true
    } catch (error) {
      console.error('Error storing data in Redis:', error);
      // Implement retry logic or alternative strategy if needed
    }
    const processResult = {
      status: 'Success',
      startDate: '2024-03-06T04:30:00.000Z',
    };

    return {
      id: 1,
      eyeProductId: 123847,
      pipelineId: 456,
      processResult: processResult,
    };
  }
  async sendRedis(preKey: string, pipelineStatusRequest: PipelineStatusDto) {
    const client = await this.myCacheService.getClient();
    const key = `${preKey}:${pipelineStatusRequest.eyeProductId}_${pipelineStatusRequest.pipelineId}`;
    const data = {
      eyeProductId: pipelineStatusRequest.eyeProductId,
      pipelineId: pipelineStatusRequest.pipelineId,
      // ... other relevant data
    };

    await client.setex(key, 3600, JSON.stringify({ data }));
  }

  @MessagePattern('processed_and_Published_by_python')
  async handleProcessedResults(
    @Payload() data: any,
    @Ctx() context: RedisContext,
  ) {
    console.log(
      'Step 3 ==> Reply back from Python to Nest, data==> ' +
        data +
        ' ***Redis Pub/Sub***',
    );
    this.eventEmitter.emit('published_from_NestToSocket_pipelineStatus', data);
  }
}
