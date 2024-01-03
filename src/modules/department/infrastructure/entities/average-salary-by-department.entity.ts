import { UserEntity } from 'src/modules/user';
import { ViewEntity, ViewColumn, DataSource } from 'typeorm';
import { DepartmentEntity } from './department.entity';

@ViewEntity({
  expression: (connection: DataSource) =>
    connection
      .createQueryBuilder()
      .select('AVG(u.salary)', 'averageSalary')
      .addSelect('d.id', 'departmentId')
      .addSelect('d.name', 'departmentName')
      .from(UserEntity, 'u')
      .leftJoin(DepartmentEntity, 'd', 'u.departmentId = d.id')
      .groupBy('d.id, d.name'),
})
export class AverageSalaryByDepartment {
  @ViewColumn()
  averageSalary: number;

  @ViewColumn()
  departmentId: number;

  @ViewColumn()
  departmentName: string;
}
