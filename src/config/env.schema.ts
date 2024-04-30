import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  POSTGRES_HOST: string;

  @IsNumber()
  POSTGRES_PORT: number;

  @IsString()
  POSTGRES_USER: string;

  @IsString()
  POSTGRES_PASSWORD: string;

  @IsString()
  POSTGRES_DB: string;

  @IsString()
  SECRET_JWT_ACCESS: string;

  @IsString()
  SECRET_JWT_REFRESH: string;

  @IsString()
  SECRET_JWT: string;

  @IsNumberString()
  ACCESS_EXPIRES_IN: string;

  @IsNumberString()
  REFRESH_EXPIRES_IN: string;
}
