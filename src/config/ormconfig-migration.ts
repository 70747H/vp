import 'dotenv/config';
import { DataSource } from 'typeorm';
const config = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOSTNAME,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['dist/src/../**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
  logging: true,
  synchronize: false,
});
export default config;
