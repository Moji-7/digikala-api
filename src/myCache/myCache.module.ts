
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import { Module, Global } from '@nestjs/common';

import { MyCacheService } from './myCache.service';

import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientService } from './redisClient.service';
import { RedisSubscriberService } from './RedisSubscriberService';
import { MessageSenderService } from './messageHandlers/sender.service';
import { MessageReciverService } from './messageHandlers/reciever.service';
import { HttpModule } from '@nestjs/axios';
import { InterNestcommunicatinService } from './inter.nestCommunication.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: (): CacheModuleOptions<RedisClientOptions> => ({
        store: redisStore,
        isGlobal: true,
        host: '127.0.0.1',
        port: 6379,
      }),
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
        // ... other Axios options
      })
     })
  ],
  providers: [MyCacheService,RedisClientService,RedisSubscriberService,MessageSenderService,MessageReciverService,InterNestcommunicatinService],
  exports: [MyCacheService,RedisClientService,RedisSubscriberService,MessageSenderService,MessageReciverService,InterNestcommunicatinService],
})
export class MyCacheModule {}
