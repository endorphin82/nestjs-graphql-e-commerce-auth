import { PubSub } from 'apollo-server-express';
import { Product } from '../models/product.model';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { NotFoundException } from '@nestjs/common';
import { ProductArgs } from './dto/product.args';
import { ProductInput } from './dto/product.input';

const pubSub = new PubSub();

@Resolver(of => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {
  }

  @Query(returns => Product)
  async product(@Args('id') id: number): Promise<Product> {
    const product = await this.productService.findOneById(id);
    if (!product) {
      throw new NotFoundException(id);
    }
    return product;
  }

  @Query(returns => [Product])
  async products(@Args() productArgs: ProductArgs): Promise<Product[]> {
    return await this.productService.findAll(productArgs);
  }

  @Mutation(returns => Product)
  async addProduct(
    @Args('data') data: ProductInput,
  ): Promise<Product> {
    const product = await this.productService.create(data);
    pubSub.publish('productAdded', { productAdded: Product });
    return product;
  }
}
