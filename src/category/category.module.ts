import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { DatabaseModule } from '../database/database.module';
import { CategoryResolver } from './category.resolver';
import { categoryProviders } from './category.providers';
import { ProductService } from '../product/product.service';

@Module({
  imports: [DatabaseModule],
  providers: [...categoryProviders, CategoryService, CategoryResolver, ProductService],
})
export class CategoryModule {
}
