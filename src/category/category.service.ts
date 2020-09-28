import { Inject, Injectable } from '@nestjs/common';
import { CategoryEntity } from '../models/category.entity';
import { Repository } from 'typeorm';
import { NewCategoryInput } from './dto/newCategoryInput';
import { CategoryArgs } from './dto/category.args';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly _categoryRepository: Repository<CategoryEntity>,
  ) {
  }

  async create(data: NewCategoryInput): Promise<CategoryEntity> {
    return this._categoryRepository.save(data);
  }

  async findOneById(id: number): Promise<CategoryEntity> {
    return this._categoryRepository.findOne(id);
  }

  async findAll(categoriesArgs: CategoryArgs): Promise<CategoryEntity[]> {
    return this._categoryRepository.find(categoriesArgs);
    // return [] as CategoryEntity[];
  }

  async remove(id: number): Promise<Boolean> {
    try {
      await this._categoryRepository.delete(id);
      return true;
    } catch (e) {
      return false;
    }
  }
}
