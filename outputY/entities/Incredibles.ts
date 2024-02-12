import { Column, Entity } from "typeorm";

@Entity("incredibles", { schema: "digikala" })
export class Incredibles {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "title_fa", nullable: true, length: 255 })
  titleFa: string | null;

  @Column("varchar", { name: "title_en", nullable: true, length: 255 })
  titleEn: string | null;

  @Column("varchar", { name: "url", nullable: true, length: 255 })
  url: string | null;

  @Column("varchar", {
    name: "shipment_description",
    nullable: true,
    length: 255,
  })
  shipmentDescription: string | null;

  @Column("int", { name: "has_lead_time", nullable: true })
  hasLeadTime: number | null;

  @Column("varchar", { name: "brand", nullable: true, length: 255 })
  brand: string | null;

  @Column("varchar", { name: "category", nullable: true, length: 255 })
  category: string | null;

  @Column("varchar", { name: "item_category2", nullable: true, length: 255 })
  itemCategory2: string | null;

  @Column("varchar", { name: "item_category3", nullable: true, length: 255 })
  itemCategory3: string | null;

  @Column("varchar", { name: "item_category4", nullable: true, length: 255 })
  itemCategory4: string | null;

  @Column("varchar", { name: "item_category5", nullable: true, length: 255 })
  itemCategory5: string | null;

  @Column("varchar", { name: "main_image_url", nullable: true, length: 255 })
  mainImageUrl: string | null;

  @Column("int", { name: "is_fast_shipping", nullable: true })
  isFastShipping: number | null;

  @Column("int", { name: "is_ship_by_seller", nullable: true })
  isShipBySeller: number | null;

  @Column("int", { name: "min_price_in_last_month", nullable: true })
  minPriceInLastMonth: number | null;

  @Column("int", { name: "seller_id", nullable: true })
  sellerId: number | null;

  @Column("varchar", { name: "seller_title", nullable: true, length: 255 })
  sellerTitle: string | null;

  @Column("varchar", { name: "seller_url", nullable: true, length: 255 })
  sellerUrl: string | null;

  @Column("int", { name: "selling_price", nullable: true })
  sellingPrice: number | null;

  @Column("int", { name: "rrp_price", nullable: true })
  rrpPrice: number | null;

  @Column("int", { name: "order_limit", nullable: true })
  orderLimit: number | null;

  @Column("int", { name: "is_incredible", nullable: true })
  isIncredible: number | null;

  @Column("int", { name: "discount_percent", nullable: true })
  discountPercent: number | null;
}
