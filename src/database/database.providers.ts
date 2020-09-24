import { Connection, createConnection, getMetadataArgsStorage } from 'typeorm';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';


export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION', // @ts-ignore
    useFactory: async (): Promise<Connection> => await createConnection<ConnectionOptions>({
      type: 'sqlite',
      database: join(__dirname, '..', 'data', 'data.sqlite'),
      logging: true,
      autoLoadEntities: true,
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];