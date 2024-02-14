// import { Controller, Get, Query, Inject } from '@nestjs/common';
// import { ProxyService } from './proxy/proxy.service';


// @Controller('digikala')
// export class DigikalaController {
//   constructor(@Inject(ProxyService) private proxyService: ProxyService) {}

//   @Get('search')
//   async searchdigikala(
//     @Query('q') q: string,
//     @Query('page') page: number,
//     @Query('sort') sort: string,
//   ) {
//     // Define the request options
//     const config = {
//       method: 'GET',
//       url: '/search', // This will be rewritten by the proxyService
//       params: {
//         q, // The search term
//         page, // The page number
//         sort, // The sort order
//       },
//     };

//     // Make the request using the proxyService and return the response data
//     return this.proxyService.proxyRequest(config);
//   }
// }

import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { DigikalaService } from './digikala.service';
import { ApiQuery } from '@nestjs/swagger';
import { SearchProductQuery } from 'src/hamechidun/DTO/product';



@Controller('digikala')
export class DigikalaController {
  constructor(@Inject(DigikalaService) private proxyService: DigikalaService) {}

  @Get('search')
  async get() {
    // Make the request using the proxyService and return the response data
    return this.proxyService.search();
  }  

 
  @Get('searchProduct')
  @ApiQuery({ name: 'inputValue', type: String, required: false })
  @ApiQuery({ name: 'page', type: Number, required: true })
    async getProducts(@Query() searchProductQuery: SearchProductQuery): Promise<any> {
    // Make the request using the proxyService and return the response data
    return this.proxyService.searchProduct(searchProductQuery);
  }  
  @Get('ordersme')
  async getOrdersMe() {
    // Make the request using the proxyService and return the response data
    return this.proxyService.getOrdersMe();
  }
}
