import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BaseEntity, ManyToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('Product')
@ObjectType()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => String)
  id: string;

  @Column({ type: 'varchar', length: 500 })
  @Field()
  title: string;

  @Column({ type: 'varchar', length: 500 })
  @Field()
  image: string;

  @Column({ type: 'varchar', length: 500 })
  @Field({ nullable: true })
  description: string;

  @Column()
  @Field()
  price: number;

  @ManyToOne(type => CategoryEntity, category => category.products, { lazy: true })

  // @ts-ignore
  @Field({type: () => CategoryEntity, nullable: true })
  category: CategoryEntity;

  // @ManyToMany(type => CategoryEntity, category => category.products, { lazy: true })
  // @JoinTable({
  //   name: 'product_categories__category', // table name for the junction table of this relation
  //   joinColumn: {
  //     name: 'productId',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'categoryId',
  //     referencedColumnName: 'id',
  //   },
  // })
  // categories: CategoryEntity[];
}