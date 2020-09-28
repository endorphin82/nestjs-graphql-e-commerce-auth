import { Field, ObjectType } from '@nestjs/graphql';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from './category.entity';

@ObjectType()
export class Product {
  @Field(type => String)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  image: string;

  @Field()
  price: number;

  @Field(type => [CategoryEntity])
  categories: CategoryEntity[];
}