import { PubSub } from 'apollo-server-express';
import { Product } from '../models/product.model';
import { Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';

const pubSub = new PubSub();

@Resolver(of => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {
  }
}
