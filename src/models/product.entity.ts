import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Product')
export class ProductEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column({ length: 500 })
  image: string;

  @Column({ length: 500 })
  description: string;

  @Column()
  price: number;

}