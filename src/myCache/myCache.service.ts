import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class MyCacheService {
  // Declare a class property for the redis client
  private client;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    // Get the redis client from the cache manager and assign it to the class property
    this.client = this.cacheManager.store.getClient();
  }

  private readonly logger = new Logger(MyCacheService.name);

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: any, ttl?: number) {
    return await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string) {
    return await this.cacheManager.del(key);
  }

  // Add this method to get the redis client
  async getClient() {
    return this.cacheManager.store.getClient();
  }
  // This method will send any command to the redis server and return a promise
  async send_command(command: string, args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      // Use the internal_send_command method of the redis client
      this.client.internal_send_command({
        command, // The command name
        args, // The command arguments
        // The callback function that receives the error and the result
        callback: (err, res) => {
          if (err) {
            // Reject the promise if there is an error
            reject(err);
          } else {
            this.logger.log(' FT.SEARCH  @title_fa> ' + res);
            // Resolve the promise with the result
            resolve(res);
          }
        },
      });
    });
  }
}
