import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("top_selling_product", { schema: "digikala" })
export class TopSellingProduct {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @Column("varchar", { name: "title_fa", length: 255 })
  titleFa: string;

  @Column("int", { name: "rrp_price" })
  rrpPrice: number;

  @Column("int", { name: "selling_price" })
  sellingPrice: number;

  @Column("int", { name: "discount_percent" })
  discountPercent: number;
}
