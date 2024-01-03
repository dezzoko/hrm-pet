import { Module } from '@nestjs/common';
import { DepartmentEntity, DepartmentRepository } from './infrastructure';
import { AdminDepartmentDomain } from './domain/admin-department.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminDepartmentController } from './presentation/controllers/admin-department.controller';
import { DepartmentController } from './presentation/controllers/department.controller';
import { UserModule } from '../user';
import { AverageSalaryByDepartment } from './infrastructure/entities/average-salary-by-department.entity';
import { DepartmentAverageSalaryRepository } from './infrastructure/repositories/department-average-salary.repostiroy';
import { AdminDepartmentService } from './application/admin-department.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmentEntity, AverageSalaryByDepartment]),
    UserModule,
  ],
  providers: [
    DepartmentRepository,
    AdminDepartmentDomain,
    AdminDepartmentService,
    DepartmentAverageSalaryRepository,
  ],
  controllers: [AdminDepartmentController, DepartmentController],
})
export class DepartmentModule {}
