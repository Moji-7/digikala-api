import { Column, Entity } from "typeorm";

@Entity("products", { schema: "digikala" })
export class Products {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @Column("int", { name: "seller_id" })
  sellerId: number;

  @Column("varchar", { name: "seller_title", length: 255 })
  sellerTitle: string;

  @Column("varchar", { name: "seller_url", length: 255 })
  sellerUrl: string;

  @Column("int", { name: "selling_price" })
  sellingPrice: number;

  @Column("int", { name: "rrp_price" })
  rrpPrice: number;

  @Column("int", { name: "order_limit" })
  orderLimit: number;

  @Column("tinyint", { name: "is_incredible" })
  isIncredible: number;

  @Column("int", { name: "discount_percent" })
  discountPercent: number;
}
