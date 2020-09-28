import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BaseEntity } from 'typeorm';
import { ProductEntity } from './product.entity';
import { Field } from '@nestjs/graphql';

@Entity('Category')
export class CategoryEntity extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @ManyToMany(type => ProductEntity, product => product.categories, { lazy: true })
  @Field(type => [ProductEntity])
  products: ProductEntity[];
}