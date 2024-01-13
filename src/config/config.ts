import * as dotenv from 'dotenv';
import { databaseConnection } from './dataSource';
dotenv.config({ path: __dirname + '/.env' });

export const config = () => ({
  port: parseInt(process.env.PORT),
  database: databaseConnection,
});
