import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AverageSalaryByDepartment } from '../entities/average-salary-by-department.entity';

export class DepartmentAverageSalaryRepository extends Repository<AverageSalaryByDepartment> {
  constructor(
    @InjectRepository(AverageSalaryByDepartment)
    private departmentAverageSalaryRepository: Repository<AverageSalaryByDepartment>,
  ) {
    super(
      departmentAverageSalaryRepository.target,
      departmentAverageSalaryRepository.manager,
      departmentAverageSalaryRepository.queryRunner,
    );
  }
}
