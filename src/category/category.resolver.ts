import { PubSub } from 'apollo-server-express';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from '../models/category.model';
import { CategoryService } from './category.service';
import { NewCategoryInput } from './dto/newCategoryInput';
import { CategoryArgs } from './dto/category.args';
import { NotFoundException } from '@nestjs/common';

const pubSub = new PubSub();

@Resolver(of => Category)
export class CategoryResolver {
  constructor(private readonly _categoryService: CategoryService) {
  }

  @Query(returns => Category)
  async category(@Args('id') id: number): Promise<Category> {
    const category = await this._categoryService.findOneById(id);
    if (!category) {
      throw new NotFoundException(id);
    }
    return category;
  }

  @Query(returns => [Category])
  async categories(@Args() categoryArgs: CategoryArgs): Promise<Category[]> {
    return await this._categoryService.findAll(categoryArgs);
  }

  @Mutation(returns => Category)
  async addCategory(@Args('data') data: NewCategoryInput): Promise<Category> {
    const category = await this._categoryService.create(data);
    pubSub.publish('categoryAdded', { categoryAdded: Category });
    return category;
  }

  @Mutation(returns => Boolean)
  async removeCategoryById(
    @Args('id') id: number): Promise<Boolean> {
    return await this._categoryService.remove(id);
  }
}
