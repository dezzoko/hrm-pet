import { Injectable } from '@nestjs/common';
import { RoleDomain } from '../domain';
import {
  AssignUserToRoleParams,
  CreateRoleParams,
  GetRolesParams,
  UpdateRoleParams,
} from '../domain/role.domain-type';

@Injectable()
export class RoleService {
  constructor(private readonly roleDomain: RoleDomain) {}

  public async getRoles(params: GetRolesParams) {
    return this.roleDomain.getRoles(params);
  }

  public async getRoleById(id: number) {
    return this.roleDomain.getRoleById(id);
  }

  public async updateRole(params: UpdateRoleParams) {
    return this.roleDomain.updateRole(params);
  }

  public async deleteRole(id: number) {
    return this.roleDomain.deleteRole(id);
  }

  public async createRole(params: CreateRoleParams) {
    return this.roleDomain.createRole(params);
  }

  public async assignUserToRole(params: AssignUserToRoleParams) {
    return this.roleDomain.assignUserToRole(params);
  }
}
