import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { EyeProduct } from './EyeProduct.entity';
import { EyeService } from './eye.service';
import { ApiQuery } from '@nestjs/swagger';
import {
  EyeProductDTO,
  EyeProductParams,
  EyeProductResponse,
  mapToEyeProducts,
  mapToEyeProductsDTO,
} from './EyeProduct.dto';
import { TokenService } from 'src/token/token.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

// import { HttpServiceAuthInterceptor } from 'src/AuthInterceptor';
// import { AuthService } from 'src/AuthService';
// import { Request } from 'express';

@Controller('eye')
export class EyeController {
  constructor(
    // private authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly eyeService: EyeService,
    private eventEmitter: EventEmitter2,
  ) {}


  @Post('submitProducts')
  async create(@Body() payloadArray: any): Promise<EyeProductDTO[]> {
    const token = this.tokenService.getToken(); // Retrieve from service
    const eyeProducts = mapToEyeProducts(
      payloadArray,
      token.userId,
      token.pipelinesIds,
    );

    const savedEyeProducts = await this.eyeService.saveEyeProduct(eyeProducts);

    let payload = {
      channel: 'nest_nest_channel',
      message: {
        eyeProductId:savedEyeProducts[0].id,
        pipelineId: [4, 5, 6]
      }
    }
    console.log("WHY A🧨: "+JSON.stringify(payload.message))
    this.eventEmitter.emit('eye.submitted.add.pipelineStatus',payload) ;
    return mapToEyeProductsDTO(eyeProducts, token.userId, token.pipelinesIds);
  }
  // saveMultipleItems(@Body() payloadArray: SaveEyeProductDto[]): Observable<EyeProduct[]> {
  //   const eyeProducts = mapToEyeProducts(payloadArray);
  //   return new Observable((observer) => observer.next(eyeProducts));
  // }
 @Get('test')
 async testi(): Promise<any> {
  
  return null;
 }
  //http://localhost:3222/eye/?page=1&length=10&productId=123
  @Get('')
  @ApiQuery({ name: 'productId', type: Number, required: false })
  @ApiQuery({ name: 'productTitle', type: String, required: false })
  @ApiQuery({ name: 'createdAt', type: Date, required: false })
  @ApiQuery({ name: 'page', type: Number, required: true })
  @ApiQuery({ name: 'length', type: Number, required: true })
  @ApiQuery({ name: 'sortColumn', type: String, required: false })
  @ApiQuery({ name: 'sortType', type: String, required: false })
  async get(@Query() eye: EyeProductParams): Promise<EyeProductResponse> {
    const params: EyeProductParams = {
      productId: eye.productId,
      productTitle: eye.productTitle,
      createdAt: eye.createdAt,
      page: eye.page,
      length: eye.length,
    };
    //console.log(params + 'ali');
    const [eyeProducts, count] = await this.eyeService.getEyeProduct(params,11015166);
    return { eyeProducts, count };
  }
  //http://localhost:3222/eye/?page=1&length=10&productId=123
  @Delete('/:productId')
  async delete(
    @Param('productId') productId: number,
  ): Promise<{ success: boolean }> {
    const searchParams = { page: 1, length: 1 } as EyeProductParams;
    const [eyeProducts, count] = await this.eyeService.getEyeProduct(searchParams,11015166);

    if (count > 0) {
      const res = await this.eyeService.delete(eyeProducts[0].productId);
      return res;
    } else {
      throw new NotFoundException('No record found');
    }
  }
}
