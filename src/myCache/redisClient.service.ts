// Import the required modules
import { Inject, Injectable } from '@nestjs/common';

import * as Redis from 'ioredis';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
;
import { Cache } from 'cache-manager';

@Injectable()
export class RedisClientService {
  // Declare a private variable for the Redis client
  private client: Redis.Redis;

   constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    // Get the Redis client from the Redis service
    this.getClient().then((client) => (this.client = client));
  }

  // Define a method to get the Redis client
  async getClient(): Promise<Redis.Redis> {
    // Use the nestjs-redis package to get the Redis client
    const client =this.cacheManager.store.getClient();
    return client;
  }

  // Define a method to get a specific key value from Redis
  async getValue(key: string): Promise<string | null> {
    // Use the get method of the Redis client to get the value
    return this.client.get(key);
  }

  // Define a method to set a specific key value in Redis
  async setValue(key: string, value: string): Promise<void> {
    // Use the set method of the Redis client to set the value
    await this.client.set(key, value);
  }

  // Define a method to delete a specific key value from Redis
  async deleteValue(key: string): Promise<void> {
    // Use the del method of the Redis client to delete the value
    await this.client.del(key);
  }

  // Define a method to set a specific key value in Redis with an expiry time
  async setValueWithExpiry(
    key: string,
    value: string,
    expiry: number,
  ): Promise<void> {
    // Use the set method of the Redis client with the EX option to set the value with an expiry time
    await this.client.set(key, value, 'EX', expiry);
  }
}
