import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const Connection = new DataSource({
  type: 'sqlite',
  database: 'game.sqlite3',
  synchronize: true,
  logging: false,
  entities: ['src/db/models/*.model.ts'],
  migrations: ['src/db/migrations/*.ts'],
});
