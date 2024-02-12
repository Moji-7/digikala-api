import { Column, Entity } from "typeorm";

@Entity("order_product_simple", { schema: "digikala" })
export class OrderProductSimple {
  @Column("int", { primary: true, name: "order_id" })
  orderId: number;

  @Column("decimal", {
    name: "payable_price",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  payablePrice: string | null;

  @Column("int", { name: "quantity", nullable: true })
  quantity: number | null;

  @Column("varchar", { name: "title_fa", nullable: true, length: 255 })
  titleFa: string | null;
}
