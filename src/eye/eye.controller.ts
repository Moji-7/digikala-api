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

// import { HttpServiceAuthInterceptor } from 'src/AuthInterceptor';
// import { AuthService } from 'src/AuthService';
// import { Request } from 'express';

@Controller('eye')
export class EyeController {
  constructor(
    // private authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly eyeService: EyeService,
  ) {}

  @Post('submitItems')
  async create(@Body() payloadArray: any): Promise<EyeProductDTO[]> {
    const token = this.tokenService.getToken(); // Retrieve from service
    const eyeProducts = mapToEyeProducts(
      payloadArray,
      token.userId,
      token.pipelinesIds,
    );
    await this.eyeService.saveEyeProduct(eyeProducts);
    return mapToEyeProductsDTO(eyeProducts, token.userId, token.pipelinesIds);
  }
  // saveMultipleItems(@Body() payloadArray: SaveEyeProductDto[]): Observable<EyeProduct[]> {
  //   const eyeProducts = mapToEyeProducts(payloadArray);
  //   return new Observable((observer) => observer.next(eyeProducts));
  // }

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
    console.log(params + 'ali');
    const [eyeProducts, count] = await this.eyeService.getEyeProduct(params);
    return { eyeProducts, count };
  }
  //http://localhost:3222/eye/?page=1&length=10&productId=123
  @Delete('/:productId')
  async delete(
    @Param('productId') productId: number,
  ): Promise<{ success: boolean }> {
    const searchParams = { page: 1, length: 1 } as EyeProductParams;
    const [eyeProducts, count] = await this.eyeService.getEyeProduct(searchParams);

    if (count > 0) {
      const res = await this.eyeService.delete(eyeProducts[0].productId);
      return res;
    } else {
      throw new NotFoundException('No record found');
    }
  }
}
