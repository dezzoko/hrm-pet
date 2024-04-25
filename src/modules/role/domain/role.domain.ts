import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../infrastructure';
import {
  AssignUserToRoleParams,
  CreateRoleParams,
  GetRolesParams,
  UpdateRoleParams,
} from './role.domain-type';
import { UserRepository } from 'src/modules/user';

@Injectable()
export class RoleDomain {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
  ) {}

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

  public async assignUserToRole(params: AssignUserToRoleParams) {
    const { roleId, userId } = params;
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    const role = await this.roleRepository.findOne({
      where: { id: roleId },
    });

    if (user && role) {
      if (!user.roles.some((r) => r.id === roleId)) {
        user.roles.push(role);
      }
      await this.userRepository.save(user);
    } else {
      throw new Error('User or Role not found');
    }
  }
}
