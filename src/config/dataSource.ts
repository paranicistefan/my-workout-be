import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConnection = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/config/migrations/*.js'],
  synchronize: false,
  cli: {
    migrationsDir: 'src/config/migrations',
  },
};

export function getConfig() {
  return databaseConnection as DataSourceOptions;
}
const datasource = new DataSource(getConfig()); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource;
