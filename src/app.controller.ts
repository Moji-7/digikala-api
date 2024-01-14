import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Query,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MyCacheService } from './myCache/myCache.service';
import { RedisClientService } from './myCache/redisClient.service';
import { RedisExceptionFilter } from './interceptors/RedisExceptionFilter';

// Sample User JSON
const user = {
  id: 123,
  username: 'example_user',
  email: 'user@example.com',
};
@UseFilters(RedisExceptionFilter)
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly myCacheService: MyCacheService,
    private readonly redisClientService: RedisClientService,
  ) {}

  async cacheToken(token: string, user: any) {
    const client = await this.myCacheService.getClient();
    await client.setex(token, 3600, user);
  }

  @Get()
  getHello(): string {
    this.cacheToken('me', JSON.stringify(user)); // use JSON.stringify() here
    return this.appService.getHello();
  }

  @Get('cached-user/:token')
  async getCachedUser(@Param('token') token: string): Promise<any> {
    const client = await this.myCacheService.getClient();
    this.logger.log('getHello() method called' + client);
    const cachedUser = await client.get(token);
    this.logger.log('getHello() method called: ' + JSON.parse(cachedUser));
    const userObject = JSON.parse(cachedUser);
    return userObject;
  }

  // ///////////////////////////////////////////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////////////////////////////////////////
  @Get('/search')
  async search(@Query('query') query: string): Promise<any> {
    try {
      // const result = await this.myCacheService.send_command('FT.SEARCH', [
      //   'orderIdx',
      //   '%10%'//query,
      // ]);
      const result = await this.myCacheService.send_command('FT.SEARCH', [
        'orderIdx',
        '@id:[200326426 200326426]', //query,
      ]);
      this.logger.log('result>' + result);
      // Check if the result is empty
      if (result.length === 1) {
        //throw new NotFoundException('No results found');
        throw new HttpException(
          'No results found for your query',
          HttpStatus.NO_CONTENT,
        );
      }

      //get the json part of third part
      const jsonData = result[2][1];
      const result_ = JSON.parse(jsonData);
      return result_;
    } catch (error) {
      if (error instanceof HttpException) {
        // If yes, rethrow the error to let the exception filter handle it
        throw error;
      } else {
        // If not, throw a custom HttpException with a message and a status code
        // You can use the @HttpException() decorator to create an instance of the HttpException class
        throw new HttpException(
          'An error occurred while executing the redis search command',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        //BadRequestException
        //UnauthorizedException
        //ForbiddenException
        //RequestTimeoutException
      }
    }
  }
}
