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
  async findWithProducts(productId: number): Promise<any[]> {
    return this.incrediblesRepository
      .createQueryBuilder('incredibles') // create a query builder with an alias
      .select([
        'incredibles.id AS id',
        'incredibles.min_price_in_last_month AS min_price_in_last_month',
        'incredibles.selling_price AS selling_price',
        'incredibles.seller_id AS discount_percent',
        'incredibles.rrp_price AS rrp_price',
        'incredibles.seller_id AS inc_seller_id',
        'incredibles.seller_title AS seller_title',
        'products.selling_price AS product_selling_price',
        'products.discount_percent AS product_discount_percent',
        'products.rrp_price AS product_rrp_price',
        'products.seller_id AS product_seller_id',
        'products.seller_title AS product_seller_title',
      ]) // select the columns you want to retrieve
      .innerJoin(
        ProductEntity,
        'products',
        'incredibles.id = products.product_id',
      ) // perform an inner join with the ProductEntity and the join condition
      .orderBy('incredibles.id') // order by incredibles.id
      .where(productId ? 'incredibles.id = :product_id' : '1=1', {
        product_id: productId,
      })
      .getRawMany(); // execute the query and get the raw results
  }
}
