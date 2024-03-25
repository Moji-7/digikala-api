import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pipelines } from './Pipelines.Entity';
import { EyeProduct } from 'src/eye/EyeProduct.entity';

@Entity('pipelineStatus')
export class PipelineStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  eyeProductId: number;

  @Column({ nullable: false })
  pipelineId: number;

  @Column({ nullable: false, length: 255, default: 'Pending' })
  lastRunnedStatus: string;

  @Column({ type: 'datetime', nullable: true })
  lastRunnedDate: Date;

  // @ManyToOne(() => EyeProduct)
  // eyeProduct: EyeProduct;
  @ManyToOne(() => EyeProduct, eyeProduct => eyeProduct.pipelineStatuses, { lazy: true })
  eyeProduct: Promise<EyeProduct>;
  @ManyToOne(() => Pipelines)
  pipelines: Pipelines;
}
