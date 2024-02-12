import { Column, Entity } from "typeorm";

@Entity("populate_orders_products_most", { schema: "digikala" })
export class PopulateOrdersProductsMost {
  @Column("int", { primary: true, name: "product_id" })
  productId: number;

  @Column("varchar", { name: "title_fa", length: 255 })
  titleFa: string;

  @Column("int", { name: "product_count" })
  productCount: number;
}
