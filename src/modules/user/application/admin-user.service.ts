import { Injectable } from '@nestjs/common';
import { AdminUserDomain } from '../domain/admin-user.domain';

@Injectable()
export class AdminUserService {
  constructor(private readonly adminUserDomain: AdminUserDomain) {}

  async setUserSalary(params) {
    return this.adminUserDomain.setSalary(params);
  }
}
