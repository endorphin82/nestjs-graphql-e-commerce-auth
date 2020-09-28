import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

}