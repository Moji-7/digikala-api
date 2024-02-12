import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("populate_orders_summary", { schema: "digikala" })
export class PopulateOrdersSummary {
  @Column("decimal", { name: "orders_sum_price", precision: 20, scale: 0 })
  ordersSumPrice: string;

  @Column("decimal", { name: "orders_max_price", precision: 20, scale: 0 })
  ordersMaxPrice: string;

  @Column("decimal", { name: "orders_average_price", precision: 20, scale: 0 })
  ordersAveragePrice: string;

  @Column("int", { name: "orders_count" })
  ordersCount: number;

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;
}
