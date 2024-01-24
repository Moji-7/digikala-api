// product.controller.ts

import { Controller, Get, HttpCode, Param, ParseIntPipe, Query, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("all")
  async findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }
//   @HttpCode(200) // specify the HTTP status code
//   async getData(
//     @Query('productid') productid: string,
//     @Res() res: Response, // inject the response object
//   ) : Promise<ProductEntity[]> {
//     return this.productService.findAll();
//   }

    @Get(':productId')
    async findByProductId(@Param('productId', ParseIntPipe) productId: number): Promise<Product[]> {
        return this.productService.findByProductId(productId);
    }
}
