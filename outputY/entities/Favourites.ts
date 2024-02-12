import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("favourites", { schema: "digikala" })
export class Favourites {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", nullable: true, length: 255 })
  username: string | null;

  @Column("varchar", { name: "product_name", nullable: true, length: 255 })
  productName: string | null;

  @Column("varchar", { name: "product_url", nullable: true, length: 255 })
  productUrl: string | null;

  @Column("decimal", {
    name: "last_price",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  lastPrice: string | null;

  @Column("datetime", { name: "last_datetime", nullable: true })
  lastDatetime: Date | null;
}
