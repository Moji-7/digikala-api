import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity("comments")
export class CommentsEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    product_id: number;
  
    @Column({ length: 255, collation: 'utf8mb4_persian_ci', nullable: true })
    title: string;
  
    @Column({ type: 'text', collation: 'utf8mb4_persian_ci' })
    body: string;
  
    @Column({ length: 255, charset: 'utf8mb3', collation: 'utf8mb3_general_ci', nullable: true })
    created_at: string;
  
    @Column({ nullable: true })
    rate: number;
  
    @Column({ nullable: true })
    likes: number;
  
    @Column({ nullable: true })
    dislikes: number;
  
    @Column({ length: 255, collation: 'utf8mb4_persian_ci', nullable: true })
    recommendation_status: string;
  
    @Column({ length: 7, charset: 'utf8mb3', collation: 'utf8mb3_general_ci', nullable: true })
    seller_id: string;
  
    @Column({ length: 255, collation: 'utf8mb4_persian_ci', nullable: true })
    seller_title: string;
  
    @Column({ length: 255, collation: 'utf8mb4_persian_ci', nullable: true })
    seller_code: string;
  
    @Column({ type: 'text', collation: 'utf8mb4_persian_ci', nullable: true })
    advantages: string;
  
    @Column({ type: 'text', collation: 'utf8mb4_persian_ci', nullable: true })
    disadvantages: string;
  }

 


  @Entity("comments_dataset")
  export class CommentsDataset {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    product_id: number;

    @Column({ type: "json", nullable: true })
    data: any;
  
    @Column({ type: "timestamp", nullable: true, default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
  }
  