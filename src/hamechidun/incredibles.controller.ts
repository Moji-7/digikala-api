// Incredibles Controller in Nest.js
import { Controller, Get, Query } from '@nestjs/common';
import { IncrediblesService } from './incredibles.service';
import { IncrediblesEntity } from './entity/Incredibles';

@Controller('incredibles')
export class IncrediblesController {
  constructor(private readonly incrediblesService: IncrediblesService) {}

  @Get('all')
  async findAll(): Promise<IncrediblesEntity[]> {
    return this.incrediblesService.findAll();
  }
  // create a new GET endpoint to get the join results
  @Get('with-products')
  async findWithProducts(
    @Query('productId') productId: number, // get the orderBy query parameter, if any
  ): Promise<IIncrediblesWithProducts[]> {
    // call the service method and pass the orderBy parameter, if any
    return this.incrediblesService.findWithProducts(productId);
  }
}
