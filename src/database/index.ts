import { DataSource } from 'typeorm';
import { User } from './entities/User.Entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'mistureba-blog',
  entities: [User],
  migrations: ['migrations/*'],
  synchronize: true,
  logging: true,
});
