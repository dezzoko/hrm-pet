import { Pagination } from 'src/core/interfaces/pagination';

export interface GetRolesParams extends Pagination {}

export interface CreateRoleParams {}

export interface UpdateRoleParams extends Partial<CreateRoleParams> {
  id: number;
}
