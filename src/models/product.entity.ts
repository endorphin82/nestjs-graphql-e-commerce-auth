import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { Field } from '@nestjs/graphql';

@Entity('Product')
export class ProductEntity extends BaseEntity{
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

  @ManyToMany(type => CategoryEntity, category => category.products, { lazy: true })
  @JoinTable({
    name: 'product_categories__category', // table name for the junction table of this relation
    joinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
  })
  categories: CategoryEntity[];
}