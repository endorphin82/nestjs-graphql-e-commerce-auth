import { Field, ObjectType } from '@nestjs/graphql';

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
}