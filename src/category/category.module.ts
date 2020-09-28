import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { DatabaseModule } from '../database/database.module';
import { CategoryResolver } from './category.resolver';
import { categoryProviders } from './category.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...categoryProviders, CategoryService, CategoryResolver],
})
export class CategoryModule {}
