import { PostgresConfig } from './postgres-config.type';

export const postgresConfiguration = (): PostgresConfig => {
  return {
    postgres: {
      postgresHost: process.env.POSTGRES_HOST,
      postgresPassword: process.env.POSTGRES_PASSWORD,
      postgresPort: parseInt(process.env.POSTGRES_PORT, 10),
      postgresUser: process.env.POSTGRES_USER,
      postgresDb: process.env.POSTGRES_DB,
    },
  };
};
