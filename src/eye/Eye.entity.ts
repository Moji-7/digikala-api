import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EyeProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  userId: number;

  @Column({ nullable: false})
  productId: number;

  @Column({ type: "timestamp", nullable: true, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

 
  @Column({ nullable: true, length: 255 })
  info: string;


  @Column({ nullable: false, length: 12 })
  pipelinesIds: string;
}