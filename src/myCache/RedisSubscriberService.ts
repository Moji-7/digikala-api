

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisSubscriberService  implements OnModuleInit {
  private publisherClient;
  private subscriberClient;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    const baseClient = this.cacheManager.store.getClient();
    this.publisherClient = baseClient.duplicate();
    this.subscriberClient = baseClient.duplicate();
  }

  async onModuleInit() {
    await this.subscribeToChannel('nest_redis_channel');
  }

  async subscribeToChannel(channel: string): Promise<void> {
    this.subscriberClient.on('message', (subscribedChannel, message) => {
      if (subscribedChannel === channel) {
        console.log(`subscribed to channel with: ${message}`);
      }
    });

    await this.subscriberClient.subscribe(channel);
  }

  async publishMessage(channel: string, message: string): Promise<number> {
    return this.publisherClient.publish(channel, JSON.stringify(message));
  }
}
