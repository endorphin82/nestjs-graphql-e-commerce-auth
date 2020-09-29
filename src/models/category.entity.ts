import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany, Column } from 'typeorm';
import { ProductEntity } from './product.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('Category')
@ObjectType()
export class CategoryEntity extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: 'varchar', length: 500 })
  @Field()
  title: string;

  @Column({ type: 'varchar', length: 500 })
  @Field()
  description: string;


  @OneToMany(type => ProductEntity, product => product.category)
  // @ts-ignore
  @Field({ type: () => [ProductEntity] })
  products: ProductEntity[];

  //
  // @ManyToMany(type => ProductEntity, product => product.categories, { lazy: true })
  // @Field(type => [ProductEntity])
  // products: ProductEntity[];
}