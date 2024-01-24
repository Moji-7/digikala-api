// Incredibles Entity using TypeORM
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('incredibles')
export class IncrediblesEntity {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true, length: 255 })
  title_fa: string;

  @Column({ nullable: true, length: 255 })
  title_en: string;

  @Column({ nullable: true, length: 255 })
  url: string;

  @Column({ nullable: true, length: 255 })
  brand: string;

  @Column({ nullable: true, length: 255 })
  category: string;

  @Column({ nullable: true, length: 255 })
  item_category2: string;

  @Column({ nullable: true, length: 255 })
  item_category3: string;

  @Column({ nullable: true, length: 255 })
  item_category4: string;

  @Column({ nullable: true, length: 255 })
  item_category5: string;

  @Column({ nullable: true, length: 255 })
  main_image_url: string;

  @Column({ nullable: true })
  is_fast_shipping: number;

  @Column({ nullable: true })
  is_ship_by_seller: number;

  @Column({ nullable: true })
  min_price_in_last_month: number;

  @Column({ nullable: true })
  seller_id: number;

  @Column({ nullable: true, length: 255 })
  seller_title: string;

  @Column({ nullable: true, length: 255 })
  seller_url: string;

  @Column({ nullable: true })
  selling_price: number;

  @Column({ nullable: true })
  rrp_price: number;

  @Column({ nullable: true })
  order_limit: number;

  @Column({ nullable: true })
  is_incredible: number;

  @Column({ nullable: true })
  discount_percent: number;

  @Column({ nullable: true, length: 255 })
  shipment_description: string;

  @Column({ nullable: true })
  has_lead_time: number;
}

