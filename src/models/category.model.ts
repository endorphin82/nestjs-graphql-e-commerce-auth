import { Field, ObjectType } from '@nestjs/graphql';
import { ProductEntity } from './product.entity';
import { Product } from './product.model';

@ObjectType()

export class Category {
  // @Field(type => Number)
  // id: number;

  @Field(type => String)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [ProductEntity])
  products: ProductEntity[];
}