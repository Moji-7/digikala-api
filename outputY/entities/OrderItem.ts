import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("order_item", { schema: "digikala" })
export class OrderItem {
  @PrimaryGeneratedColumn({ type: "int", name: "order_item_id" })
  orderItemId: number;

  @Column("int", { name: "order_item_quantity" })
  orderItemQuantity: number;

  @Column("int", { name: "product_id" })
  productId: number;

  @Column("varchar", { name: "product_title_fa", length: 255 })
  productTitleFa: string;

  @Column("varchar", { name: "product_title_en", length: 255 })
  productTitleEn: string;

  @Column("varchar", { name: "product_url_uri", length: 255 })
  productUrlUri: string;

  @Column("varchar", { name: "product_status", length: 255 })
  productStatus: string;

  @Column("varchar", { name: "product_brand", length: 255 })
  productBrand: string;

  @Column("varchar", { name: "product_category", length: 255 })
  productCategory: string;

  @Column("varchar", { name: "product_dimension20", length: 255 })
  productDimension20: string;

  @Column("varchar", { name: "product_item_category2", length: 255 })
  productItemCategory2: string;

  @Column("varchar", { name: "product_item_category3", length: 255 })
  productItemCategory3: string;
}
