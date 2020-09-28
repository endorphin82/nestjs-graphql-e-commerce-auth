import { Connection } from 'typeorm';
import { CategoryEntity } from '../models/category.entity';

export const categoryProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(CategoryEntity),
    inject: ['SQLITE_CONNECTION'],
  },
];