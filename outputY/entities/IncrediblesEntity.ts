import { Column, Entity } from "typeorm";

@Entity("incredibles_entity", { schema: "digikala" })
export class IncrediblesEntity {
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
}
