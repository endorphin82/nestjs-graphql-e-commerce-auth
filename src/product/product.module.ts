import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { DatabaseModule } from '../database/database.module';
import { ProductResolver } from './product.resolver';
import { productProviders } from './product.providers';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [DatabaseModule],
  providers: [...productProviders, ProductService, ProductResolver, CategoryService],
})
export class ProductModule {
}
