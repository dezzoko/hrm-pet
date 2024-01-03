import { ApplicationConfig } from './application';
import { PostgresConfig } from './postgres';

export interface Config extends PostgresConfig, ApplicationConfig {}
