
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import { Module, Global } from '@nestjs/common';

import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { MyCacheService } from './myCache.service';
import { RedisClientService } from './redisClient.service';
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
  ],
  providers: [MyCacheService,RedisClientService],
  exports: [MyCacheService,RedisClientService],
})
export class MyCacheModule {}
