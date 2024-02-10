// Incredibles Service in Nest.js
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncrediblesEntity } from './entity/Incredibles';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class IncrediblesService {
  constructor(
    @InjectRepository(IncrediblesEntity)
    private incrediblesRepository: Repository<IncrediblesEntity>,
  ) {}

  async findAll(): Promise<IncrediblesEntity[]> {
    return this.incrediblesRepository.find();
  }
  // create a new method to perform the join query
  async findWithProducts(productId: number): Promise<IIncrediblesWithOtherAll[]> {
    //return this.incrediblesRepository
    const raw = await this.incrediblesRepository
      .createQueryBuilder('incredibles') // create a query builder with an alias
      .select([
        'incredibles.id AS product_id',
        'incredibles.title_fa AS title_fa',
        'incredibles.min_price_in_last_month AS inc_minPriceInLastMonth',
        'incredibles.selling_price AS inc_price',
        'incredibles.discount_percent AS inc_discountPercent',
        'incredibles.rrp_price AS inc_rrpPrice',
        'incredibles.seller_title AS inc_sellerTitle',
        'incredibles.seller_id AS inc_sellerId',
      ])
      .addSelect([  
        'products.selling_price AS price',
        'products.discount_percent AS discountPercent',
        'products.rrp_price AS rrpPrice',
        'products.seller_id AS sellerId',
        'products.seller_title AS sellerTitle',
      ])
      .innerJoin(
        ProductEntity,
        'products',
        'incredibles.id = products.product_id',
      ) // perform an inner join with the ProductEntity and the join condition
      .orderBy('incredibles.id') // order by incredibles.id
      .where('incredibles.seller_id != products.seller_id')
      .andWhere(productId ? 'incredibles.seller_id != incredibles.id = :product_id' : '1=1', {
        product_id: productId,
      })
      .getRawMany(); // execute the query and get the raw results
      return raw;// raw.map(transformToIIncrediblesWithOtherAll);   
  }
  
}


