import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../infrastructure';
import {
  CreateRoleParams,
  GetRolesParams,
  UpdateRoleParams,
} from './role.domain-type';

@Injectable()
export class RoleDomain {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async getRoleById(id: number) {
    return this.roleRepository.findBy({ id });
  }

  public async getRoles(params: GetRolesParams): Promise<any> {
    return this.roleRepository.findWithPagination(params);
  }

  public async updateRole(params: UpdateRoleParams) {
    const updatedRole = await this.roleRepository.update(
      { id: params.id },
      {
        ...params,
      },
    );
    return updatedRole;
  }

  public async deleteRole(id: number) {
    await this.roleRepository.delete({ id });
  }

  public async createRole(params: CreateRoleParams) {
    const createdRole = this.roleRepository.create(params);
    await this.roleRepository.save(createdRole);
    return createdRole;
  }
}
