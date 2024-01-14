import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TopSellingProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  title_fa: string;

  @Column()
  rrp_price: number;

  @Column()
  selling_price: number;

  @Column()
  discount_percent: number;
}
