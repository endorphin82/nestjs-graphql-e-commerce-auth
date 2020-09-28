import { Inject, Injectable } from '@nestjs/common';
import { CategoryEntity } from '../models/category.entity';
import { Repository } from 'typeorm';
import { NewCategoryInput } from './dto/newCategoryInput';
import { CategoryArgs } from './dto/category.args';
import { ProductArgs } from '../product/dto/product.args';
import { ProductEntity } from '../models/product.entity';

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

  async findOneById(id: string): Promise<CategoryEntity> {
    return this._categoryRepository.findOne(id);
  }

  async findAll(categoriesArgs: CategoryArgs): Promise<CategoryEntity[]> {
    return this._categoryRepository.find(categoriesArgs);
    // return [] as CategoryEntity[];
  }

  async findAllByProd( ): Promise<CategoryEntity[]> {
    return this._categoryRepository.find({relations: ["products"]});
    // return [] as CategoryEntity[];
  }

  async findByProd(): Promise<ProductEntity[]> {

    // @ts-ignore
    return this._categoryRepository.find({ relations: ['products'] });
  }

  async remove(id: string): Promise<Boolean> {
    try {
      await this._categoryRepository.delete(id);
      return true;
    } catch (e) {
      return false;
    }
  }
}
