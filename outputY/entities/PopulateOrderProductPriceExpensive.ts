import { Column, Entity } from "typeorm";

@Entity("populate_order_product_price_expensive", { schema: "digikala" })
export class PopulateOrderProductPriceExpensive {
  @Column("int", { primary: true, name: "product_id" })
  productId: number;

  @Column("varchar", { name: "title_fa", length: 255 })
  titleFa: string;

  @Column("int", { name: "quantity" })
  quantity: number;

  @Column("decimal", { name: "rrp_price", precision: 10, scale: 0 })
  rrpPrice: string;

  @Column("decimal", { name: "selling_price", precision: 10, scale: 0 })
  sellingPrice: string;

  @Column("decimal", { name: "discount_percent", precision: 5, scale: 0 })
  discountPercent: string;
}
