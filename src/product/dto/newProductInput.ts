import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewProductInput {
  @Field()
  @MaxLength(500)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 500)
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 500)
  description?: string;

  @IsOptional()
  @Field(type => Int)
  price: number;
}