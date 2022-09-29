import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'mistureba-blog',
  entities: [`${__dirname}/entities/*.Entity.ts`],
  migrations: [`${__dirname}/migrations/*.ts`],
  synchronize: true,
  logging: true,
});
