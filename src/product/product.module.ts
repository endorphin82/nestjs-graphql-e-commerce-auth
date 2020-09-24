import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { DatabaseModule } from '../database/database.module';
import { productProviders } from '../database/product.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...productProviders, ProductService, ProductResolver],
})
export class ProductModule {
}
