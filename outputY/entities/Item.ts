import { Column, Entity } from "typeorm";

@Entity("item", { schema: "digikala" })
export class Item {
  @Column("int", { primary: true, name: "digiId" })
  digiId: number;

  @Column("varchar", { name: "title_fa", nullable: true, length: 255 })
  titleFa: string | null;

  @Column("varchar", { name: "title_en", nullable: true, length: 255 })
  titleEn: string | null;

  @Column("varchar", { name: "uri", nullable: true, length: 255 })
  uri: string | null;

  @Column("varchar", { name: "brand", nullable: true, length: 255 })
  brand: string | null;

  @Column("varchar", { name: "item_category2", nullable: true, length: 255 })
  itemCategory2: string | null;

  @Column("varchar", { name: "item_category3", nullable: true, length: 255 })
  itemCategory3: string | null;

  @Column("varchar", { name: "item_category4", nullable: true, length: 255 })
  itemCategory4: string | null;

  @Column("varchar", { name: "item_category5", nullable: true, length: 255 })
  itemCategory5: string | null;

  @Column("float", { name: "rating_rate", nullable: true, precision: 12 })
  ratingRate: number | null;

  @Column("int", { name: "rating_count", nullable: true })
  ratingCount: number | null;

  @Column("varchar", { name: "mainImage", nullable: true, length: 255 })
  mainImage: string | null;

  @Column("varchar", { name: "size", nullable: true, length: 255 })
  size: string | null;

  @Column("varchar", { name: "seller_code", nullable: true, length: 255 })
  sellerCode: string | null;

  @Column("varchar", { name: "seller_title", nullable: true, length: 255 })
  sellerTitle: string | null;

  @Column("float", {
    name: "seller_rating_commitment",
    nullable: true,
    precision: 12,
  })
  sellerRatingCommitment: number | null;

  @Column("int", { name: "seller_rating_count", nullable: true })
  sellerRatingCount: number | null;

  @Column("int", { name: "selling_price", nullable: true })
  sellingPrice: number | null;

  @Column("int", { name: "rrp_price", nullable: true })
  rrpPrice: number | null;

  @Column("int", { name: "discount_percent", nullable: true })
  discountPercent: number | null;

  @Column("varchar", { name: "badge_title", nullable: true, length: 255 })
  badgeTitle: string | null;

  @Column("varchar", { name: "shipment_methods", nullable: true, length: 255 })
  shipmentMethods: string | null;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;
}
