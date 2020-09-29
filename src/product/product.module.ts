import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { DatabaseModule } from '../database/database.module';
import { ProductResolver } from './product.resolver';
import { productProviders } from './product.providers';
import { CategoryService } from '../category/category.service';
import { CategoryModule } from '../category/category.module';
import { categoryProviders } from '../category/category.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...productProviders, ...categoryProviders, ProductService, ProductResolver, CategoryService],
})
export class ProductModule {
}
