import { Injectable } from '@nestjs/common';
import { ProductInput } from './dto/product.args';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
  async create(data: ProductInput): Promise<Product> {
    return {} as any;
  }
}
