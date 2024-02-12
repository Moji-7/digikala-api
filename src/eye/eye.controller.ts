import { Body, Controller, Delete, Get, NotFoundException, Post, Query } from '@nestjs/common';
import { EyeProduct } from './EyeProduct.entity';
import { EyeService } from './eye.service';
import { ApiQuery } from '@nestjs/swagger';
import { EyeProductParams, EyeProductResponse } from './EyeProduct.dto';

@Controller('eye')
export class EyeController {
  constructor(private readonly eyeService: EyeService) {}

//   http://localhost:3222/eye/EyeProduct
//   {
//     "userId": 1,
//     "productId": 123,
//     "productTile":"کرم کلینیک",
//     "info": "Sample info",
//     "pipelinesIds": "1,2,3"
//   }
  @Post('EyeProduct')
  async create(@Body() eye: EyeProduct): Promise<EyeProduct> {
    return await this.eyeService.saveEyeProduct(eye);
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
  
    const params : EyeProductParams  = {
        productId: eye.productId,
        productTitle: eye.productTitle,
        createdAt: eye.createdAt,
        page:  eye.page,
        length:  eye.length,
      } ;
      console.log(params+"ali")
      const [eyeProducts, count] =  await this.eyeService.getEyeProduct(params);
      return { eyeProducts, count };
  }
    //http://localhost:3222/eye/?page=1&length=10&productId=123
   @Delete('')
  async delete(@Query() params: EyeProductParams): Promise<{ success: boolean }> {
    const [eyeProducts, count] = await this.eyeService.getEyeProduct(params);
  
    if (count > 0) {
     const res= await this.eyeService.delete(eyeProducts[0].productId);
      return res
    } else {
      throw new NotFoundException('No record found');
    }
  }

  
}