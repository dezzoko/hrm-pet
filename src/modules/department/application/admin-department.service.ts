import { Injectable } from '@nestjs/common';
import { AdminDepartmentDomain } from '../domain/admin-department.domain';

@Injectable()
export class AdminDepartmentService {
  constructor(private readonly adminDepartmentDomain: AdminDepartmentDomain) {}

  async getAverageSalaryByDepartments(departmentId: number) {
    return this.adminDepartmentDomain.getAverageSalaryByDepartments(
      departmentId,
    );
  }
}
