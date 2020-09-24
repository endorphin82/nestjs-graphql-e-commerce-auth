import { PubSub } from 'apollo-server-express';
import { Product } from '../models/product.model';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { NotFoundException } from '@nestjs/common';

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

}
