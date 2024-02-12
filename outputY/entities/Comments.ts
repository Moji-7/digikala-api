import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("comments", { schema: "digikala" })
export class Comments {
  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("text", { name: "body" })
  body: string;

  @Column("int", { name: "rate", nullable: true })
  rate: number | null;

  @Column("int", { name: "likes", nullable: true })
  likes: number | null;

  @Column("int", { name: "dislikes", nullable: true })
  dislikes: number | null;

  @Column("text", { name: "advantages", nullable: true })
  advantages: string | null;

  @Column("text", { name: "disadvantages", nullable: true })
  disadvantages: string | null;

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "product_id", nullable: true })
  productId: number | null;

  @Column("varchar", { name: "created_at", nullable: true, length: 255 })
  createdAt: string | null;

  @Column("varchar", {
    name: "recommendation_status",
    nullable: true,
    length: 255,
  })
  recommendationStatus: string | null;

  @Column("varchar", { name: "seller_id", nullable: true, length: 7 })
  sellerId: string | null;

  @Column("varchar", { name: "seller_title", nullable: true, length: 255 })
  sellerTitle: string | null;

  @Column("varchar", { name: "seller_code", nullable: true, length: 255 })
  sellerCode: string | null;
}
