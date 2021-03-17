import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      schema: 'public',
      synchronize: true,
      logging: true,
      entities: ['dist/entities/*.entity.js'],
      retryAttempts: 20,
      retryDelay: 6000,
      autoLoadEntities: true,
      keepConnectionAlive: true,
      verboseRetryLog: false,
    };
  }
}