import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: join(__dirname, '..', 'data', 'data.sqlite'),
    logging: true,
    autoLoadEntities: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
