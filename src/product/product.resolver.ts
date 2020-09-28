import { PubSub } from 'apollo-server-express';
import { Product } from '../models/product.model';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { NotFoundException } from '@nestjs/common';
import { ProductArgs } from './dto/product.args';
import { NewProductInput } from './dto/newProductInput';
import { Category } from '../models/category.model';

const pubSub = new PubSub();

@Resolver(of => Product)
export class ProductResolver {
  constructor(
    private readonly _productService: ProductService
  ) {
  }

  @Query(returns => Product)
  async product(@Args('id') id: string): Promise<Product> {
    const product = await this._productService.findOneById(id);
    if (!product) {
      throw new NotFoundException(id);
    }
    return product;
  }

  @Query(returns => [Product])
  async products(@Args() productArgs: ProductArgs): Promise<Product[]> {
    return await this._productService.findAll(productArgs);
  }

  @ResolveField()
  @Query(returns => [Category])
  async categories(@Args() productArgs: ProductArgs): Promise<Product[]> {
    // @ts-ignore
    return await this._productService.findByCat();
  }

  @Mutation(returns => Product)
  async addProduct(@Args('data') data: NewProductInput): Promise<Product> {
    const product = await this._productService.create(data);
    pubSub.publish('productAdded', { productAdded: Product });
    return product;
  }

  @Mutation(returns => Boolean)
  async removeProductById(
    @Args('id') id: string): Promise<Boolean> {
    return await this._productService.remove(id);
  }
}
