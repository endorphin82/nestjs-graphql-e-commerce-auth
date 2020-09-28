import { createConnection } from 'typeorm';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import { ProductEntity } from '../models/product.entity';
import { CategoryEntity } from '../models/category.entity';

const postgresOpt: ConnectionOptions = ({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'changeme',
  database: 'ecom',
  synchronize: true,
  entities: [ProductEntity],
  cli: {
    migrationsDir: 'src/migration',
  },
});

const optionsSqlite: ConnectionOptions = {
  type: 'sqlite',
  database: join(__dirname, '..', '..', 'data', 'data.sqlite'),
  entities: [CategoryEntity],
  logging: true,
};

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      return await createConnection(postgresOpt);
      // return connection.getRepository(ProductEntity);
    },
    synchronize: true,
  },
  {
    provide: 'SQLITE_CONNECTION',
    useFactory: async () => {
      return await createConnection(optionsSqlite);
      // return connection.getRepository(ProductEntity);
    },
    synchronize: true,
  },
];