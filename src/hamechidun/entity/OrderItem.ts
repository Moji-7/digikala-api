import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Define a TypeOrm entity that matches the output of your query
@Entity('OrderItem')
export class OrderItem {
  @Column()
  @PrimaryGeneratedColumn()
  order_item_id: number;

  @Column()
  order_item_quantity: number;

  @Column()
  product_id: number;

  @Column()
  product_title_fa: string;

  @Column()
  product_title_en: string;

//   @Column()
//   product_url_uri: string;

  @Column()
  product_status: string;

  @Column()
  product_brand: string;

  @Column()
  product_category: string;

  @Column()
  product_dimension20: string;

  @Column()
  product_item_category2: string;

  @Column()
  product_item_category3: string;

//   @Column()
//   product_image_storage_ids: any;

//   @Column()
//   product_image_url: any;

  @Column()
  price_rrp_price: number;

  @Column()
  price_selling_price: number;

  @Column()
  price_discount_percent: number;

  @Column()
  price_is_incredible: boolean;

  @Column()
  price_is_promotion: boolean;

  @Column()
  price_is_locked_for_digiplus: boolean;

  @Column()
  price_bnpl_active: boolean;

  @Column()
  variant_id: number;

  @Column()
  seller_id: number;

  @Column()
  seller_title: string;

  @Column()
  seller_code: string;

  @Column()
  seller_url: string;
}