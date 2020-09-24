import { Connection } from 'typeorm';
import { ProductEntity } from '../models/product.entity';


export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(ProductEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];