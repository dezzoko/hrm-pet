export interface ApplicationConfig {
  application: {
    nodeEnv: string;
    port: number;
    secretJwtRefresh: string;
    secretJwtAccess: string;
    accessExpiresIn: number;
    refreshExpiresIn: number;
  };
}
