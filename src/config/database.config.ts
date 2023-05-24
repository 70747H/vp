import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs(
  'database',
  (): PostgresConnectionOptions =>
    ({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: false,
      ssl: false,
      logging: true,
      entities: ['dist/src/../**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'migrations',
    } as PostgresConnectionOptions),
);
