import { createConnection } from 'typeorm';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import { ProductEntity } from '../models/product.entity';

const options: ConnectionOptions = {
  type: 'sqlite',
  database: join(__dirname, '..', '..', 'data', 'data.sqlite'),
  entities: [ProductEntity],
  logging: true,
};

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      return await createConnection(options);
      // return connection.getRepository(ProductEntity);
    },
    synchronize: true,
  },
];