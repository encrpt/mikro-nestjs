import { Logger } from '@nestjs/common';

export default (async () => {
  const logger = new Logger('MikroORM');
  const config = {
    logger: logger.log.bind(logger),
    type: 'postgresql',
    host: 'host.docker.internal',
    dbName: 'chairman',
    user: 'postgres',
    password: 'Test1234',
    allowGlobalContext: process.env.NODE_ENV !== 'test' ? false : true,
    debug: true,
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    migrations: {
      path: './dist/persistence/migrations',
      pathTs: './src/persistence/migrations',
    },
  };
  return config;
})();
