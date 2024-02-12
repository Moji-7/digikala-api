import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("comments_dataset", { schema: "digikala" })
export class CommentsDataset {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @Column("json", { name: "data", nullable: true })
  data: object | null;

  @Column("json", { name: "most_liked", nullable: true })
  mostLiked: object | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;
}
