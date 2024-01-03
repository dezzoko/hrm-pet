import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ADMIN_ROLE } from 'src/core/constants';
import { Roles } from 'src/core/decorators/roles.decorator';
import { AdminDepartmentService } from '../../application/admin-department.service';

@Roles(ADMIN_ROLE)
@Controller('admin/department')
export class AdminDepartmentController {
  constructor(
    private readonly adminDepartmentService: AdminDepartmentService,
  ) {}

  @Get('avg-salary-by-departments')
  async getAverageSalaryByDepartments(
    @Query('department-id', ParseIntPipe) departmentId: number,
  ) {
    return this.adminDepartmentService.getAverageSalaryByDepartments(
      departmentId,
    );
  }
}
