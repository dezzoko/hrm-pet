import { ApplicationConfig } from './application-config.type';

export const applicationConfiguration = (): ApplicationConfig => {
  return {
    application: {
      nodeEnv: process.env.NODE_ENV,
      port: parseInt(process.env.PORT, 10),
      accessExpiresIn: +process.env.ACCESS_EXPIRES_IN,
      refreshExpiresIn: +process.env.REFRESH_EXPIRES_IN,
      secretJwtAccess: process.env.SECRET_JWT_ACCESS,
      secretJwtRefresh: process.env.SECRET_JWT_REFRESH,
    },
  };
};
