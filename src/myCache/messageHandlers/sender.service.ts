
// message-handler.service.ts
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RedisSubscriberService } from 'src/myCache/RedisSubscriberService';

@Injectable()
export class MessageSenderService {
  constructor(
    private redisSubscriberService_publish:RedisSubscriberService 
    ) {}

  @OnEvent('pipeline.status.submitted')
  async handleMessagePublishedEvent(payload: { channel: string; message: any }) {
    //console.log('ali; pipeline.status.submitted')
    console.log('Step 2 ==>from Nest to Redis ***Pub/sub***' );
    console.log("WHY🧨: "+JSON.stringify(payload.message))
    // Logic to publish the message to Redis
    await this.redisSubscriberService_publish.publishMessage(payload.channel, payload.message);
  }
  
  @OnEvent('pipeline.incredibles.request')
  async handleIncrediblesPublishedEvent(payload: { channel: string; message: any }) {
    //console.log('ali; pipeline.status.submitted')
    console.log('Step 2 ==>from Nest to Redis ***Pub/sub***' );
    console.log("WHY🧨: "+JSON.stringify(payload.message))
    // Logic to publish the message to Redis
    await this.redisSubscriberService_publish.publishMessage(payload.channel, payload.message);
  }

}