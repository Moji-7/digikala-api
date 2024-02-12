import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("eye_product")
export class EyeProduct {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column("int", {
        nullable: false,
        name: "userId"
    })
    userId: number;

    @Column("int", {
        nullable: false,
        name: "productId"
    })
    productId: number;

    @Column("varchar", {
        nullable: true,
        length: 255,
        name: "productTitle"
    })
    productTitle: string | null;

    @Column("varchar", {
        nullable: true,
        length: 255,
        name: "info"
    })
    info: string | null;

    @Column("varchar", {
        nullable: false,
        length: 12,
        name: "pipelinesIds"
    })
    pipelinesIds: string;

    @Column("timestamp", {
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
        name: "created_at"
    })
    created_at: Date | null;
}
