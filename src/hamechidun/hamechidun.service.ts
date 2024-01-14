

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { TopSellingProduct } from './entity/TopSellingProduct'; // Replace with your entity model
import { PopulateOrderProductPriceExpensive, PopulateOrdersProductsMost, PopulateOrdersSellersMost, PopulateOrdersSummary, populateOrdersProductsCategoriesInfo } from './entity/entityAll';



@Injectable()
export class HamechidunService {
  constructor(
    @InjectRepository(TopSellingProduct)
    private readonly topSellingProductRepository: Repository<TopSellingProduct>,
    @InjectRepository(PopulateOrdersSummary)
    private populateOrdersSummary: Repository<PopulateOrdersSummary>, 
    @InjectRepository(PopulateOrdersSellersMost)
    private populateOrdersSellersMost: Repository<PopulateOrdersSellersMost>,
    @InjectRepository(PopulateOrdersProductsMost)
    private populateOrdersProductsMost: Repository<PopulateOrdersProductsMost>,
    @InjectRepository(PopulateOrderProductPriceExpensive)
    private populateOrderProductPriceExpensive: Repository<PopulateOrderProductPriceExpensive>, 
  ) {}

  private readonly logger = new Logger(HamechidunService.name);

  async get_topSellingProducts(): Promise<TopSellingProduct[]> {
    return this.topSellingProductRepository.query('CALL GetTopSellingProducts()');
  }

  async get_populate_orders_summery(): Promise<PopulateOrdersSummary> {
    return await this.populateOrdersSummary.findOne({
      where: { // specify the condition
        orders_count:MoreThan(0),
      },
    });
  }  

  async get_populate_orders_products_most(): Promise<PopulateOrdersProductsMost[]> {
    return await this.populateOrdersProductsMost.find({
      order: {
        product_count: "DESC",
      },
    });
  }
  
  async get_populate_orders_sellers_most(): Promise<PopulateOrdersSellersMost[]> {
    return await this.populateOrdersSellersMost.find({
      order: {
        repetition_count: "DESC",
      },
    });
  }  
  async get_populate_order_product_price_expensive(): Promise<PopulateOrderProductPriceExpensive[]> {
    return await this.populateOrderProductPriceExpensive.find({
      order: {
        selling_price: "DESC",
      },
    });
  }

  async get_populate_orders_products_categories_info( itemCategory2: string,itemCategory3: string ) {
    this.logger.log('SERVICE SERVICE: ' + itemCategory2 +' ,item_category3 is: '+itemCategory3);
    const [result] = await  this.topSellingProductRepository.query(
      'CALL populate_orders_products_categories_info(?,?);',
      [itemCategory2, itemCategory3],
    );
    return result;
  }
  
}
