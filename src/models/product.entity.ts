import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  image: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column()
  price: number;

}