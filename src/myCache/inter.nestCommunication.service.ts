
// message-handler.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { OnEvent } from '@nestjs/event-emitter';
import { PipelineStatusService } from 'src/pipeline/pipelineStatus.service';


@Injectable()
export class InterNestcommunicatinService implements OnModuleInit {
    private pipelineStatusService: PipelineStatusService;
  
    constructor(private moduleRef: ModuleRef) {}
  
    async onModuleInit() {
      this.pipelineStatusService = await this.moduleRef.get(PipelineStatusService, { strict: false });
    }

      
  @OnEvent('eye.submitted.add.pipelineStatus')
  async handleEventEyeSubmitted(payload: { channel: string; message: any }) {
    //console.log('ali; pipeline.status.submitted')
    console.log('eye.submitted ==>add.pipelineStatus ***controller/controller***' );
    // Logic to publish the message to Redis
    await this.pipelineStatusService.saveMultiplePipelineStatus(payload.message.eyeProductId,payload.message.productId,payload.message.pipelineId);
  }
}
