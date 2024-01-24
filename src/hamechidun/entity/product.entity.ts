// product.entity.ts

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity("products")
export class ProductEntity {

  @PrimaryColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  seller_id: number;

  @Column()
  seller_title: string;

  @Column()
  seller_url: string;

  @Column()
  selling_price: number;

  @Column()
  rrp_price: number;

  @Column()
  order_limit: number;

  @Column()
  is_incredible: boolean;

  @Column()
  discount_percent: number;
}
