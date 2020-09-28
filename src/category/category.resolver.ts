import { PubSub } from 'apollo-server-express';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Category } from '../models/category.model';
import { CategoryService } from './category.service';
import { NewCategoryInput } from './dto/newCategoryInput';
import { CategoryArgs } from './dto/category.args';
import { NotFoundException } from '@nestjs/common';
import { ProductArgs } from '../product/dto/product.args';
import { ProductService } from '../product/product.service';
import { Product } from '../models/product.model';

const pubSub = new PubSub();

@Resolver(of => Category)
export class CategoryResolver {
  constructor(
    private readonly _categoryService: CategoryService) {
  }

  @Query(returns => Category)
  async category(@Args('id') id: string): Promise<Category> {
    const category = await this._categoryService.findOneById(id);
    if (!category) {
      throw new NotFoundException(id);
    }
    return category;
  }

  @ResolveField()
  @Query(returns => [Product])
  async products(@Args() categoryArgs: CategoryArgs): Promise<Product[]> {
    return await this._categoryService.findByProd();
  }

  @Query(returns => [Category])
  async categories(@Args() categoryArgs: CategoryArgs): Promise<Category[]> {
    return await this._categoryService.findAll(categoryArgs);
  }

  // @ResolveField()
  // @Query(returns => [Product])
  // async products(): Promise<Product[]> {
  //   return await this._productService.findAll();
  // }

  @Mutation(returns => Category)
  async addCategory(@Args('data') data: NewCategoryInput): Promise<Category> {
    const category = await this._categoryService.create(data);
    pubSub.publish('categoryAdded', { categoryAdded: Category });
    return category;
  }

  @Mutation(returns => Boolean)
  async removeCategoryById(
    @Args('id') id: string): Promise<Boolean> {
    return await this._categoryService.remove(id);
  }

}
