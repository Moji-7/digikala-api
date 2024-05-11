// Incredibles Controller in Nest.js
import { Controller, Get, Query } from '@nestjs/common';
import { IncrediblesService } from './incredibles.service';
import { IncrediblesEntity } from './entity/Incredibles';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('incredibles')
export class IncrediblesController {
  constructor(
    private eventEmitter: EventEmitter2,
    private readonly incrediblesService: IncrediblesService
  ) {}

  @Get('all')
  async findAll(@Query('incredible') incrediblesRequest: IIncrediblesRequest): Promise<IncrediblesEntity[]> {
    
    
    console.log('Step 1 ==>from clinet to Nest ***Rest***');
    let payload = {
      channel: 'rest_redis_channel_incredibles',
      message: {
        pipelineId: 1,//incrediblesRequest.category,
        eyeProductId:2 //incrediblesRequest.date,
      },
    };
    this.eventEmitter.emit('pipeline.incredibles.request', payload);
    
    return this.incrediblesService.findAll();

  }
  // create a new GET endpoint to get the join results
  @Get('with-products')
  async findWithProducts(
    @Query('productId') productId: number, // get the orderBy query parameter, if any
  ): Promise<IIncrediblesWithOtherAll[]> {
    // call the service method and pass the orderBy parameter, if any
    return this.incrediblesService.findWithProducts(productId);
  }
}
