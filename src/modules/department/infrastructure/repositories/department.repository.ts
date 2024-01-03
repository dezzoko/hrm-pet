import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentEntity } from '../entities';

export class DepartmentRepository extends Repository<DepartmentEntity> {
  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
  ) {
    super(
      departmentRepository.target,
      departmentRepository.manager,
      departmentRepository.queryRunner,
    );
  }
}
