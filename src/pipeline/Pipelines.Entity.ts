
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { PipelineStatus } from './PipelineStatus.Entity';


@Entity("pipelines")
export class Pipelines {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  name: string;

  @Column({ nullable: false, length: 255 })
  info: string;
}