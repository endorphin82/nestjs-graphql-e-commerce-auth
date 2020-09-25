import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { DatabaseModule } from '../database/database.module';
import { ProductResolver } from './product.resolver';
import { productProviders } from './product.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...productProviders, ProductService, ProductResolver],
})
export class ProductModule {
}
