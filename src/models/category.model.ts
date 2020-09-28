import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(type => Number)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}