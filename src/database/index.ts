import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import config from '../config/config';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: config.postgresDb.host,
  port: config.postgresDb.port,
  username: config.postgresDb.username,
  password: config.postgresDb.password,
  database: config.postgresDb.database,
  entities: [`${__dirname}/entities/*.Entity.ts`],
  migrations: [`${__dirname}/migrations/*.ts`],
  seeds: [`${__dirname}/seeds/*.ts`],
  synchronize: false,
  logging: true,
};

const AppDataSource = new DataSource(options);

export default AppDataSource;
