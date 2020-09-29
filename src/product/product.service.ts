import { ProductArgs } from './dto/product.args';
import { NewProductInput } from './dto/newProductInput';
import { ProductEntity } from '../models/product.entity';
import {  Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryEntity } from '../models/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly _productRepository: Repository<ProductEntity>,
    private readonly _categoryRepository: Repository<CategoryEntity>,
  ) {
  }

  async create(data: NewProductInput): Promise<ProductEntity> {
    return this._productRepository.save(data);
  }

  async findOneById(id: string): Promise<ProductEntity> {
    return this._productRepository.findOne(id);
  }

  async findAll(productsArgs: ProductArgs): Promise<ProductEntity[]> {
    return this._productRepository.find(productsArgs);
    // return [] as ProductEntity[];
  }

  async findOneCat(productsArgs: ProductArgs): Promise<CategoryEntity> {

    return this._categoryRepository.findOne({where: {id: productsArgs }})
  }

  async remove(id: string): Promise<Boolean> {
    try {
      await this._productRepository.delete(id);
      return true;
    } catch (e) {
      return false;
    }
  }
}
