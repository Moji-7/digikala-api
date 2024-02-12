import { Column, Entity } from "typeorm";

@Entity("populate_orders_sellers_most", { schema: "digikala" })
export class PopulateOrdersSellersMost {
  @Column("int", { primary: true, name: "seller_id" })
  sellerId: number;

  @Column("varchar", { primary: true, name: "seller_title", length: 255 })
  sellerTitle: string;

  @Column("varchar", { primary: true, name: "seller_url", length: 255 })
  sellerUrl: string;

  @Column("int", { name: "repetition_count" })
  repetitionCount: number;
}
