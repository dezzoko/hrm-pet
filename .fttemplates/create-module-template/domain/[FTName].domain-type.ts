import { Pagination } from 'src/core/interfaces/pagination';

export interface Get<FTName | Capitalize>sParams extends Pagination {}

export interface Create<FTName | Capitalize>Params {}

export interface Update<FTName | Capitalize>Params extends Partial<Create<FTName | Capitalize>Params> {
  id: number;
}
