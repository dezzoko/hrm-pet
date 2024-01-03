import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { DepartmentRepository } from '../infrastructure';
import { UserService } from 'src/modules/user';
import { DepartmentAverageSalaryRepository } from '../infrastructure/repositories/department-average-salary.repostiroy';
import * as departmentsMocks from '../mocks/departments.json';
@Injectable()
export class AdminDepartmentDomain implements OnModuleInit {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private readonly userService: UserService,
    private readonly departmentAverageSalaryRepository: DepartmentAverageSalaryRepository,
  ) {}
  onModuleInit() {
    departmentsMocks.map(async (item) => {
      const exists = await this.departmentRepository.exist({
        where: { name: item?.name },
      });

      if (!exists) {
        await this.departmentRepository.save(item);
      }
    });
  }

  async addUserToDepartment(userId: number, departmentId: number) {
    try {
      const user = await this.userService.getUserById(userId);
      const department = await this.departmentRepository.findOne({
        where: {
          id: departmentId,
        },
        relations: ['users'],
      });

      if (!user || !department) {
        throw new Error('Пользователь или департамент не найден.');
      }

      department.users.push(user);
      await this.departmentRepository.save(department);

      return { status: 'Success' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteUserFromDepartment(userId: number, departmentId: number) {
    try {
      const user = await this.userService.getUserById(userId);
      const department = await this.departmentRepository.findOne({
        where: {
          id: departmentId,
        },
        relations: ['users'],
      });

      if (!user || !department) {
        throw new Error('Пользователь или департамент не найден.');
      }

      department.users = department.users.filter((u) => u.id !== user.id);
      await this.departmentRepository.save(department);

      return { status: 'Success' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createDepartment(params) {
    const { description, name } = params;
    const department = this.departmentRepository.create({
      description: description,
      name: name,
    });

    await this.departmentRepository.save(department);
    return department;
  }

  async deleteDepartment(departmentId: number) {
    await this.departmentRepository.delete({ id: departmentId });
    return { status: 'success' };
  }

  async getAverageSalaryByDepartments(departmentId: number) {
    return this.departmentAverageSalaryRepository.findBy({
      departmentId,
    });
  }
}
