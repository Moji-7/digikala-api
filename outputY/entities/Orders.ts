import { Column, Entity } from "typeorm";

@Entity("orders", { schema: "digikala" })
export class Orders {
  @Column("int", { primary: true, name: "order_id" })
  orderId: number;

  @Column("json", { name: "order_content" })
  orderContent: object;
}
