import { PubSub } from 'apollo-server-express';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { NewCategoryInput } from './dto/newCategoryInput';
import { CategoryArgs } from './dto/category.args';
import { NotFoundException } from '@nestjs/common';

import { CategoryEntity } from '../models/category.entity';
import { ProductEntity } from '../models/product.entity';

const pubSub = new PubSub();

@Resolver(of => CategoryEntity)
export class CategoryResolver {
  constructor(
    private readonly _categoryService: CategoryService) {
  }

  @Query(returns => CategoryEntity)
  async category(@Args('id') id: string): Promise<CategoryEntity> {
    const category = await this._categoryService.findOneById(id);
    if (!category) {
      throw new NotFoundException(id);
    }
    return category;
  }

  @ResolveField()
  @Query(returns => [ProductEntity])
  async products(@Args() categoryArgs: CategoryArgs): Promise<ProductEntity[]> {
    return await this._categoryService.findByProd();
  }

  @Query(returns => [CategoryEntity])
  async categories(@Args() categoryArgs: CategoryArgs): Promise<CategoryEntity[]> {
    return await this._categoryService.findAll(categoryArgs);
  }

  // @ResolveField()
  // @Query(returns => [Product])
  // async products(): Promise<Product[]> {
  //   return await this._productService.findAll();
  // }

  @Mutation(returns => CategoryEntity)
  async addCategory(@Args('data') data: NewCategoryInput): Promise<CategoryEntity> {
    const category = await this._categoryService.create(data);
    pubSub.publish('categoryAdded', { categoryAdded: CategoryEntity });
    return category;
  }

  @Mutation(returns => Boolean)
  async removeCategoryById(
    @Args('id') id: string): Promise<Boolean> {
    return await this._categoryService.remove(id);
  }

}
