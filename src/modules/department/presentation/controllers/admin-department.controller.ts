import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { Roles } from 'src/core/decorators/roles.decorator';
import { AdminDepartmentService } from '../../application/admin-department.service';
import { RolesEnum } from 'src/core/constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin/department')
@Roles(RolesEnum.ADMIN)
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
