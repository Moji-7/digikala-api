import { IncrediblesController } from './incredibles.controller';
import {
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Query,
  Res,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';

import { ApiQuery } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { HamechidunService } from './hamechidun.service';
import { TopSellingProduct } from './entity/TopSellingProduct';
import {
  PopulateOrderProductPriceExpensive,
  PopulateOrdersProductsMost,
  PopulateOrdersSellersMost,
  PopulateOrdersSummary,
  populateOrdersProductsCategoriesInfo,
} from './entity/entityAll';
import { RedisExceptionFilter } from 'src/interceptors/RedisExceptionFilter';
import { OrderItem } from './entity/OrderItem';
import { OrderItemService } from './orderItems.service';
import { ObjectLiteral } from 'typeorm';
import { OrderItemDto } from './DTO/OrderItemDto';
import { IncrediblesService } from './incredibles.service';
import { CommentsDataset } from './entity/comments.entity';

import { ProcessingService } from './proccessing/hamechidun.process.service';
import { ProccessedService } from './proccessed/hamechidun.processed.service';
// import { ProccessedService } from './proccessed/hamechidun.processed.service';


interface CommentsDatasetResponse {
  dataset: CommentsDataset[];
  count: number;
}

@UseFilters(RedisExceptionFilter)
@Controller('hamechidun')
export class HamechidunController {
  constructor(
    private readonly hamechidunService: HamechidunService,
    private readonly orderItemService: OrderItemService,
    private readonly incrediblesService: IncrediblesService,
    private readonly proccessingService: ProcessingService,
   private readonly processedService: ProccessedService,
  ) {}
  private readonly logger = new Logger(HamechidunController.name);

  @Get('top-selling')
  async getTopSellingProducts(): Promise<TopSellingProduct[]> {
    return this.hamechidunService.get_topSellingProducts();
  }

  @Get('populate_orders_summary')
  async get_populate_orders_summery(): Promise<PopulateOrdersSummary> {
    return this.hamechidunService.get_populate_orders_summery();
  }
  @Get('populate_orders_sellers_most')
  async get_populate_orders_sellers_most(): Promise<
    PopulateOrdersSellersMost[]
  > {
    return this.hamechidunService.get_populate_orders_sellers_most();
  }

  @Get('populate_orders_products_most')
  async get_populate_orders_products_most(): Promise<
    PopulateOrdersProductsMost[]
  > {
    return this.hamechidunService.get_populate_orders_products_most();
  }
  @Get('populate_order_product_price_expensive')
  async get_populate_order_product_price_expensive(): Promise<
    PopulateOrderProductPriceExpensive[]
  > {
    return this.hamechidunService.get_populate_order_product_price_expensive();
  }

  // orders_grouping_by_categories_2_3 = (data, categoryField,is_item_category3) => {
  //   const groupedData = R.groupBy(R.prop(categoryField), data);

  //   const result = R.map((group) => {
  //     const categoryTitle = R.head(group)[categoryField];
  //     return {
  //       category: {
  //         name: categoryField,
  //         title: categoryTitle,
  //         count: R.sum(R.pluck('count', group)),
  //         max_price: R.apply(Math.max, R.pluck('max_price', group)),
  //         avg_price: R.mean(R.pluck('avg_price', group)),
  //         total_price: R.sum(R.pluck('total_price', group)),
  //         avg_discount: R.mean(R.pluck('avg_discount', group)),
  //       }
  //     };
  //   }, R.values(groupedData));
  //   return result;
  // };

  fillChildsArray = (category2, category3) => {
    return category2.map((cat2) => {
      const parentTitle = cat2.category.title;
      const matchingCategory3 = category3.filter(
        (cat3) => cat3.category.parent === parentTitle,
      );
      const childs = matchingCategory3.map((match) => {
        return {
          name: match.category.name,
          title: match.category.title,
          count: match.category.count,
          total_price: match.category.total_price,
          parent: match.category.parent,
        };
      });
      return {
        category: {
          ...cat2.category,
          childs: childs,
        },
      };
    });
  };

  @Get('populate_orders_products_categories_info')
  @HttpCode(200) // specify the HTTP status code
  async getData(
    @Query('item_category2') item_category2: string,
    @Query('item_category3') item_category3: string,
    @Res() res: Response, // inject the response object
  ) {
    const order_orderItems_grouping =
      await this.hamechidunService.get_populate_orders_products_categories_info(
        item_category2 ?? null,
        item_category3 ?? null,
      );
    const orderGroupedCategory_2 =
      this.proccessingService.OrdersGroupingByCategories23(
        order_orderItems_grouping,
        'item_category2',
        false,
      );
    const orderGroupedCategory_3 =
      this.proccessingService.OrdersGroupingByCategories23(
        order_orderItems_grouping,
        'item_category3',
        true,
      );
    // Usage
    const filledOrderGroupedCategory_2 = this.fillChildsArray(
      orderGroupedCategory_2,
      orderGroupedCategory_3,
    );

    // use the send method to return the response with two parts
    res.send({
      orderGroupedCategory_2: filledOrderGroupedCategory_2,
      orderGroupedCategory_3: orderGroupedCategory_3,
    });
  }

  @Get('orderItem')
  @ApiQuery({ name: 'quantity', type: Number, required: false })
  @ApiQuery({ name: 'product_id', type: Number, required: false })
  @ApiQuery({ name: 'product_title_fa', type: String, required: false })
  @ApiQuery({ name: 'title_en', type: String, required: false })
  @ApiQuery({ name: 'brand', type: String, required: false })
  @ApiQuery({ name: 'category', type: String, required: false })
  @ApiQuery({ name: 'item_category2', type: String, required: false })
  @ApiQuery({ name: 'item_category3', type: String, required: false })
  @ApiQuery({ name: 'rrp_price', type: Number, required: false })
  @ApiQuery({ name: 'selling_price', type: Number, required: false })
  @ApiQuery({ name: 'discount_percent', type: Number, required: false })
  @ApiQuery({ name: 'is_incredible', type: Boolean, required: false })
  @ApiQuery({ name: 'is_promotion', type: Boolean, required: false })
  @ApiQuery({ name: 'bnpl_active', type: Boolean, required: false })
  @ApiQuery({ name: 'seller_id', type: Number, required: false })
  @ApiQuery({ name: 'seller_title', type: String, required: false })
  @ApiQuery({ name: 'seller_code', type: String, required: false })
  @ApiQuery({ name: 'sortColumn', type: String, required: false })
  @ApiQuery({ name: 'sortType', type: String, required: false })
  @ApiQuery({ name: 'sortColumn', required: false })
  @ApiQuery({ name: 'sortType', required: false })
  async getUsers(@Query(ValidationPipe) params: OrderItemDto) {
    const {
      quantity,
      product_title_fa,
      product_id,
      product_title_en,
      brand,
      category,
      item_category2,
      item_category3,
      rrp_price,
      selling_price,
      discount_percent,
      is_incredible,
      is_promotion,
      bnpl_active,
      seller_id,
      seller_title,
      seller_code,
      sortColumn,
      sortType,
    } = params;

    return this.orderItemService.get_orderItems(
      product_title_fa,
      quantity,
      product_id,
      product_title_en,
      brand,
      category,
      item_category2,
      item_category3,
      rrp_price,
      selling_price,
      discount_percent,
      is_incredible,
      is_promotion,
      bnpl_active,
      seller_id,
      seller_title,
      seller_code,
      sortColumn,
      sortType,
    );
  }

  @Get('otherSellers')
  async IncrediblesWithSameProducts(
    @Query('productId') productId: number, // get the orderBy query parameter, if any
  ): Promise<any[]> {
    const res = await this.incrediblesService.findWithProducts(productId);
    //console.log(JSON.stringify(res))
    return this.proccessingService.IncrediblesWithSameProducts(res);
  }

  
 
  
  @Get('commentsdataset')
  async comments(
    @Query('productId') productId: number, // get the orderBy query parameter, if any
  ): Promise<CommentsDatasetResponse> {
    const [dataset, count] = await this.processedService.getCommentsDataset(806044, 1, 3);
    return { dataset, count };
  }
  
}
