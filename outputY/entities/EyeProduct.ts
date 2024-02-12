import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("eye_product", { schema: "digikala" })
export class EyeProduct {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "userId" })
  userId: number;

  @Column("int", { name: "productId" })
  productId: number;

  @Column("varchar", { name: "productTitle", length: 255 })
  productTitle: string;

  @Column("varchar", { name: "info", nullable: true, length: 255 })
  info: string | null;

  @Column("varchar", { name: "pipelinesIds", length: 12 })
  pipelinesIds: string;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;
}
