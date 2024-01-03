export interface PostgresConfig {
  postgres: {
    postgresHost: string;
    postgresPassword: string;
    postgresUser: string;
    postgresPort: number;
    postgresDb: string;
  };
}
