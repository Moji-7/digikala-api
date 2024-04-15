import { Expose } from "class-transformer";
import { Pipelines } from "src/pipeline/Pipelines.Entity";
import { PipelineStatus } from "src/pipeline/PipelineStatus.Entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

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

    @Expose({ name: 'id' })
    @Column("int", {
        nullable: false,
        name: "productId"
    })
    productId: number;

    @Expose({ name: 'title_fa' })
    @Column("varchar", {
        nullable: true,
        length: 255,
        name: "productTitle"
    })
    titleFa: string | null;

    @Column("varchar", {
        nullable: true,
        length: 255,
        name: "info"
    })
    info: string | null;

    // @Column("int", {
    //     nullable: false,
    //     name: "pipelinesId"
    // })
    // pipelinesId: number;
    

    @Column("timestamp", {
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
        name: "created_at"
    })
    created_at: Date | null;

    @OneToMany(() => PipelineStatus, pipelineStatus => pipelineStatus.eyeProduct)
    pipelineStatuses: Promise<PipelineStatus[]>;
  

    
    // @OneToMany(() => PipelineStatus, (pipelineStatus) => pipelineStatus.eyeProduct)
    // pipelineStatuses: PipelineStatus[];
  }
