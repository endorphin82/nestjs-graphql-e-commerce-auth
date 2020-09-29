import { PubSub } from 'apollo-server-express';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { NotFoundException } from '@nestjs/common';
import { ProductArgs } from './dto/product.args';
import { NewProductInput } from './dto/newProductInput';
import { ProductEntity } from '../models/product.entity';
import { CategoryEntity } from '../models/category.entity';

const pubSub = new PubSub();

@Resolver(of => ProductEntity)
export class ProductResolver {
  constructor(
    private readonly _productService: ProductService
  ) {
  }

  @Query(returns => ProductEntity)
  async product(@Args('id') id: string): Promise<ProductEntity> {
    const product = await this._productService.findOneById(id);
    if (!product) {
      throw new NotFoundException(id);
    }
    return product;
  }

  @Query(returns => [ProductEntity])
  async products(@Args() productArgs: ProductArgs): Promise<ProductEntity[]> {
    return await this._productService.findAll(productArgs);
  }

  @ResolveField()
  @Query(returns => CategoryEntity)
  async category(@Args() productArgs: ProductArgs): Promise<CategoryEntity> {

    return await this._productService.findOneCat(productArgs);
  }

  @Mutation(returns => ProductEntity)
  async addProduct(@Args('data') data: NewProductInput): Promise<ProductEntity> {
    const product = await this._productService.create(data);
    pubSub.publish('productAdded', { productAdded: ProductEntity });
    return product;
  }

  @Mutation(returns => Boolean)
  async removeProductById(
    @Args('id') id: string): Promise<Boolean> {
    return await this._productService.remove(id);
  }
}
