import { join } from 'path';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '0926',
  database: 'nest',
  synchronize: true,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')]
});

dataSource
  .initialize()
  .then(() => {
    console.log('DataSource initialize  successfully ');
  })
  .catch((err) => {
    console.error('dataSource initialize  error', err);
  });
